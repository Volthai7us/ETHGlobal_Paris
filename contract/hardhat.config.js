require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    "mantle-testnet": {
      url: "https://rpc.testnet.mantle.xyz/",
      accounts: [process.env.PRIVATE_KEY], // Uses the private key from the .env file
    },
    polygon: {
      url: "https://polygon.llamarpc.com",
      accounts: [process.env.PRIVATE_KEY], // Uses the private key from the .env file
    },
    "zk-testnet": {
      url: "https://testnet.era.zksync.dev",
      accounts: [process.env.PRIVATE_KEY], // Uses the private key from the .env file
    },
    "linea-testnet": {
      url: "https://rpc.goerli.linea.build",
      accounts: [process.env.PRIVATE_KEY], // Uses the private key from the .env file
    },
  },
};
