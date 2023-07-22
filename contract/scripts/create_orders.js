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

  //polygon zkbob: 0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B
  //polygon ape: 0xB7b31a6BC18e48888545CE79e83E06003bE70930

  //mantle testnet dai : 0xa35d7f5dd89a336A427Ebb63C428C3068b6c3105
  //mantle testnet usdt: 0xbAF72402f98f16e77638Ce5FCC5689CD1627E8ff

  let sell_token = "0xa35d7f5dd89a336A427Ebb63C428C3068b6c3105";
  let buy_token = "0xbAF72402f98f16e77638Ce5FCC5689CD1627E8ff";

  //    function placeOrder(bool _isBuyOrder, uint _price, uint _amount) public {
  const tx1 = await orderbook.placeOrder(sell_token, 1, buy_token, 1);
  const tx2 = await orderbook.placeOrder(sell_token, 2, buy_token, 1);
  const tx3 = await orderbook.placeOrder(sell_token, 2, buy_token, 2);
  const tx4 = await orderbook.placeOrder(sell_token, 3, buy_token, 1);
  const tx5 = await orderbook.placeOrder(sell_token, 3, buy_token, 2);
  const tx6 = await orderbook.placeOrder(sell_token, 3, buy_token, 3);
  const tx7 = await orderbook.placeOrder(sell_token, 4, buy_token, 1);
  const tx8 = await orderbook.placeOrder(sell_token, 4, buy_token, 2);
  const tx9 = await orderbook.placeOrder(sell_token, 4, buy_token, 3);
  const tx10 = await orderbook.placeOrder(sell_token, 4, buy_token, 4);
  const tx11 = await orderbook.placeOrder(buy_token, 5, sell_token, 1);
  const tx12 = await orderbook.placeOrder(buy_token, 5, sell_token, 2);
  const tx13 = await orderbook.placeOrder(buy_token, 5, sell_token, 3);
  const tx14 = await orderbook.placeOrder(buy_token, 5, sell_token, 4);
  const tx15 = await orderbook.placeOrder(buy_token, 5, sell_token, 5);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
