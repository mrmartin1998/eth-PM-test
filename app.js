const express = require('express');
const Web3 = require('web3');
const app = express();
app.use(express.json());

const ganacheUrl = 'http://localhost:7545';
const web3 = new Web3(ganacheUrl); 

// Add your smart contract setup here

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Purchase",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Sale",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "purchase",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sell",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]; // Replace with your contract's ABI
const contractAddress = '0x0987e9DCB567e6f8050ECddEdCDd5e122981b155'; // Replace with your contract's address

const gameShopContract = new web3.eth.Contract(contractABI, contractAddress);

// Define API endpoints that interact with the smart contract

app.post('/purchase', async (req, res) => {
    const { fromAddress, amount } = req.body;

    try {
        const tx = {
            from: fromAddress,
            to: contractAddress,
            value: web3.utils.toWei(amount, 'ether')
        };

        const receipt = await web3.eth.sendTransaction(tx);
        res.json({ success: true, receipt: receipt });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
