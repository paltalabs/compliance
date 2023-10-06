import React, { useState } from 'react';

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

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleSubmit = async () => {
        // Here, you can handle what happens when the user clicks the button.
        // For instance, you can send the address to an API or navigate to another page.
        alert(`Getting compliance for: ${address}`);

        const addressData = {
            address: address
        };

        try {
            const response = await fetch('/api/searchTxFromAddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addressData)
            });
            console.log("response:", response)
            if (!response.ok) {
                throw new Error('Network response was not ok');  // Handle HTTP errors
            }
            const data = await response.json();
            console.log("data", data)
            // setComplianceInfo(JSON.stringify(jsonToList(data)))
            setComplianceInfo(convertToCSV(jsonToList(data)))
        } catch (error) {
            console.error('Error executing GraphQL query:', error);
        }
    };

    function DownloadButton({ data }: any) {
        const handleDownload = () => {
            downloadCSV(data);
        };

        return <button onClick={handleDownload}>Download CSV</button>;
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Welcome to Our Compliance Checker</h1>
            <input
                type="text"
                placeholder="Paste your address"
                value={address}
                onChange={handleAddressChange}
                style={{ padding: '10px', fontSize: '16px', margin: '20px 0' }}
            />
            <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Get your compliance
            </button>
            <a>{complianceInfo}</a>
            {
                (complianceInfo !== '' &&
                    <DownloadButton data={complianceInfo} />)
            }
        </div>
    );
};

export default LandingPage;
