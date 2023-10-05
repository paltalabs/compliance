import React, { useState } from 'react';

const LandingPage: React.FC = () => {
    const [address, setAddress] = useState('');

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleSubmit = async () => {
        // Here, you can handle what happens when the user clicks the button.
        // For instance, you can send the address to an API or navigate to another page.
        alert(`Getting compliance for: ${address}`);

        try {
            const response = await fetch('/api/executeQuery', { method: 'POST' });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error executing GraphQL query:', error);
        }
    };

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
        </div>
    );
};

export default LandingPage;
