import React, { useState } from 'react';

const TAB_SIZE: number = 10;

function downloadCSV(data: any, filename = 'download.csv') {
    // let csv = convertToCSV(data);
    let csv = data;
    let blob = new Blob([csv], { type: 'text/csv' });
    let url = window.URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);

    a.click();
    document.body.removeChild(a);
}

function convertToCSV(objArray: any) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    const header = "type, blockNumber, txHash, toId, fromId, amount"
    str = header + '\r\n'

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line !== '') line += ',';
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}

function jsonToList(jsonData: any) {
    const sentPaymentsNodes = jsonData.data.account.sentPayments.nodes;
    const receivedPaymentsNodes = jsonData.data.account.receivedPayments.nodes;
    const sentTransfersNodes = jsonData.data.account.sentTransfers.nodes;
    const receivedTransfersNodes = jsonData.data.account.receivedTransfers.nodes;

    // Map over the nodes and add the 'type' field
    const sentPaymentsList = sentPaymentsNodes.map((payment: any) => ({
        type: 'sentPayments',
        ...payment
    }));

    const receivedPaymentsList = receivedPaymentsNodes.map((payment: any) => ({
        type: 'receivedPayments',
        ...payment
    }));
    const sentTransfersList = sentTransfersNodes.map((payment: any) => ({
        type: 'sentTransfers',
        ...payment
    }));

    const receivedTransfersList = receivedTransfersNodes.map((payment: any) => ({
        type: 'receivedTransfers',
        ...payment
    }));
    const combinedList = [...sentPaymentsList, ...receivedPaymentsList, ...sentTransfersList, ...receivedTransfersList];
    return combinedList
}

const LandingPage: React.FC = () => {
    const [address, setAddress] = useState('');
    const [complianceInfo, setComplianceInfo] = useState('')
    const [transactions, setTransactions] = useState<any[]>([]);
    const [currentTab, setCurrentTab] = useState(0);  // to track current tab
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/searchTxFromAddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address: address })
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setTransactions(jsonToList(data));
        } catch (error) {
            setErrorMessage("This address has no associated records.")
            setTransactions([])
            console.error('Error executing GraphQL query:', error);
        }
    };

    const displayedTransactions = transactions.slice(currentTab * TAB_SIZE, (currentTab + 1) * TAB_SIZE);

    function DownloadButton({ data }: any) {
        const handleDownload = () => {
            downloadCSV(data);
        };

        return <button onClick={handleDownload}>Download CSV</button>;
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Welcome to Our Compliance Helper</h1>
            <div> You may want to try with the following address</div>
            <div> gc4tavxbv4cffjgrrks76bbiw6zrti6tyfwhbkp53t5r3xsueamtfwsx</div>
            <input
                type="text"
                placeholder="Paste your address"
                value={address}
                onChange={handleAddressChange}
                style={{ padding: '10px', fontSize: '16px', margin: '20px 0' }}
            />
            <div style={{ color: 'red' }}>{errorMessage}</div>
            <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Get your compliance
            </button>

            {/* Displaying Transactions */}
            {displayedTransactions.map((transaction, index) => (
                <div key={index}>
                    {/* Render your transaction details here */}
                    {transaction.type} - {transaction.amount} - {/* other fields... */}
                </div>
            ))}

            {/* Pagination Controls */}
            <button onClick={() => setCurrentTab((prev) => prev - 1)} disabled={currentTab === 0}>Previous</button>
            <button onClick={() => setCurrentTab((prev) => prev + 1)} disabled={(currentTab + 1) * TAB_SIZE >= transactions.length}>Next</button>

            {/* Download Button */}
            <DownloadButton data={convertToCSV(transactions)} />
        </div>
    );
};

export default LandingPage;
