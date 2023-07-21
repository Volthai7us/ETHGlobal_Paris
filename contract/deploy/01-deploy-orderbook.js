const { network, ethers } = require("hardhat");
const {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  console.log("Deploying OrderBook...");

  // Replace the following lines with the deployment logic specific to your OrderBook contract
  const isBuyOrder = true;
  const price = ethers.utils.parseEther("1000"); // Replace with your desired price in Ether
  const amount = 10; // Replace with your desired amount

  const orderBook = await deploy("OrderBook", {
    from: deployer,
    args: [], // Add any constructor arguments if required by your OrderBook contract
    log: true,
    waitConfirmations: developmentChains.includes(network.name)
      ? 1
      : VERIFICATION_BLOCK_CONFIRMATIONS,
  });

  // You can add any additional logic here after deploying the contract

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(orderBook.address, []); // Add any constructor arguments if required for verification
  }
};

module.exports.tags = ["all", "orderbook"];
