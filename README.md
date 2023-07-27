# Decentralized Orderbook for Trading ERC20 Tokens on Mantle Network and Polygon

## Overview

This repository hosts a decentralized orderbook for trading ERC20 tokens deployed on the Mantle Network and Polygon. Our orderbook, contrary to the traditional centralized exchanges, operates on the blockchain, thereby ensuring security, transparency, and disintermediation. It supports a variety of ERC20 tokens, providing users with a wide array of trading possibilities.

## Features

- Decentralized orderbook
- Supports wide range of ERC20 tokens
- Operates on Mantle Network and Polygon

## Technologies Used

- Solidity
- Hardhat
- Mantle Testnet
- Polygon Mainnet
- ReactJS
- Web3.js/Ethers.js

## Setup and Installation

### Prerequisites

1. Node.js and npm installed on your machine. If not, you can download them [here](https://nodejs.org/en/download/).
2. Metamask browser extension installed. You can download it [here](https://metamask.io/download/).

### Installation Steps

1. Clone the repository to your local machine.
```sh
git clone https://github.com/Volthai7us/ETHGlobal_Paris.git
```
2. Navigate to the repository.
```sh
cd ETHGlobal_Paris/contract
```
3. Install the required npm packages.
```sh
npm install
```
4. Replace the private key in the `.env` file with your private key.
5. Compile and deploy the smart contracts.
```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network yournetwork
```
6. Start the React application.
```sh
npm start
```
7. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

Connect your Metamask wallet, select the network (Mantle or Polygon), and start trading your ERC20 tokens in a decentralized environment!

## License

This project is licensed under the MIT License.

## Acknowledgements

We would like to express our gratitude towards the developers and maintainers of Ethereum, Solidity, Hardhat, ReactJS, and other technologies we used in this project.
