const hre = require("hardhat");
const ethers = hre.ethers;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const raw = fs.readFileSync(
    "./artifacts/contracts/Orderbook.sol/Orderbook.json"
  );
  const data = JSON.parse(raw);
  const privateKey = process.env.PRIVATE_KEY;
  const address = process.env.ORDER_BOOK;

  let customHttpProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.testnet.mantle.xyz/"
  );

  const wallet = new hre.ethers.Wallet(privateKey, customHttpProvider);
  const orderbook = new hre.ethers.Contract(address, data.abi, wallet);
  orderbook.connect(wallet);

  //    function placeOrder(bool _isBuyOrder, uint _price, uint _amount) public {
  const tx1 = await orderbook.placeOrder(true, 100, 1);
  const tx2 = await orderbook.placeOrder(true, 200, 1);
  const tx3 = await orderbook.placeOrder(true, 300, 1);
  const tx4 = await orderbook.placeOrder(true, 400, 1);
  const tx5 = await orderbook.placeOrder(true, 500, 1);
  const tx6 = await orderbook.placeOrder(true, 600, 1);
  const tx7 = await orderbook.placeOrder(true, 700, 1);
  const tx8 = await orderbook.placeOrder(true, 800, 1);
  const tx9 = await orderbook.placeOrder(true, 900, 1);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
