// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameShop {
    address owner;

    event Purchase(address indexed buyer, uint amount);
    event Sale(address indexed seller, uint amount);

    constructor() {
        owner = msg.sender;
    }

    // Function for purchasing items (sending ETH to the shop)
    function purchase() external payable {
        require(msg.value > 0, "You must send ETH to purchase.");
        emit Purchase(msg.sender, msg.value);
    }

    // Function for selling items (receiving ETH from the shop)
    function sell(address payable seller, uint amount) external {
        require(msg.sender == owner, "Only the shop owner can sell items.");
        require(address(this).balance >= amount, "Shop does not have enough ETH.");
        seller.transfer(amount);
        emit Sale(seller, amount);
    }

    // Function to get the contract's ETH balance (for the shop)
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
