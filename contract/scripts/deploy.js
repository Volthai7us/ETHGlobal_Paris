// We import Hardhat's ethers.js library
const hre = require("hardhat");

async function main() {
  // Getting the contract factory
  const OrderBook = await hre.ethers.getContractFactory("OrderBook");

  // Deploying the contract
  const orderBook = await OrderBook.deploy();

  // Waiting for the contract to be deployed
  await orderBook.deployed();

  // Printing the contract's address
  console.log("OrderBook deployed to:", orderBook.address);
}

// Handling any errors that occur
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
