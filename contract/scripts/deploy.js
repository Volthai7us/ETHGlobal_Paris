// We import Hardhat's ethers.js library
const hre = require("hardhat");

async function main() {
  // Getting the contract factory
  const OrderBook = await hre.ethers.getContractFactory("OrderBook");
  // const Apecoin = await hre.ethers.getContractFactory("Apecoin");

  // Deploying the contract
  const orderBook = await OrderBook.deploy();
  // const apecoin = await Apecoin.deploy("Apecoin", "APE");

  // Waiting for the contract to be deployed
  await orderBook.deployed();
  // await apecoin.deployed();

  // Printing the contract's address
  console.log("OrderBook deployed to:", orderBook.address);
  // console.log("Apecoin deployed to:", apecoin.address);
}

// Handling any errors that occur
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
