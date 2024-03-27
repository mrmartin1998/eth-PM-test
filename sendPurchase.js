// Filename: sendPurchase.js
const axios = require('axios');

function sendPurchaseRequest(fromAddress, amount) {
    const apiEndpoint = 'http://localhost:3000/purchase';
    const data = {
        fromAddress: fromAddress,
        amount: amount
    };

    axios.post(apiEndpoint, data)
        .then(response => {
            console.log('Transaction successful:', response.data);
        })
        .catch(error => {
            console.error('Transaction failed:', error.response.data);
        });
}

// The arguments are passed from the command line
const args = process.argv.slice(2);
sendPurchaseRequest(args[0], args[1]);
