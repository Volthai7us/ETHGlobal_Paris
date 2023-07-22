import { useState } from "react";
import { ethers, JsonRpcProvider } from "ethers";
import { getContract } from "../api";
import { contract_address } from "../api";

function OrderForm({
  tokens,
  setSelectedBuyToken,
  setSelectedSellToken,
  selectedBuyToken,
  selectedSellToken,
}) {
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const handleBuy = async () => {
    const provider = new JsonRpcProvider("https://rpc.testnet.mantle.xyz/");
    const signer = await provider.getSigner();

    const tx = {
      to: contract_address,
      arguments: [
        tokens.find((token) => token.name === selectedBuyToken).address,
        amount,
        tokens.find((token) => token.name === selectedSellToken).address,
        price * amount,
      ],
      gasPrice: 1000000000,
      gasLimit: 1000000,
    };

    const txResponse = await signer.sendTransaction(tx);
    console.log(txResponse);
    // contract
    //   .placeOrder(
    //     tokens.find((token) => token.name === selectedBuyToken).address,
    //     amount,
    //     tokens.find((token) => token.name === selectedSellToken).address,
    //     price * amount
    //   )
    //   .then((data) => {
    //     console.log("Mining...please wait.", data);
    //     data.wait().then((data) => {
    //       console.log(
    //         `Mined, see transaction: https://rinkeby.etherscan.io/tx/${data.hash}`
    //       );
    //       console.log(contract);
    //     });
    //   });

    // const contract = getContract();
    // contract.then((contract) => {
    //   const amountToBuy = amount;
    //   const amountToSell = price * amount;
    //   contract
    //     .placeOrder(
    //       tokens.find((token) => token.name === selectedBuyToken).address,
    //       amountToBuy,
    //       tokens.find((token) => token.name === selectedSellToken).address,
    //       amountToSell
    //     )
    //     .then((tx) => {
    //       console.log(tx);
    //     });
    // });
    // }
  };

  const handleSell = () => {
    if (!selectedSellToken) {
      console.log("Please select a coin to sell!");
      // return;
    }
    // Satım işlemini gerçekleştirmek için gerekli kodlar burada olacak.
    console.log(`Sell button clicked! Selling ${selectedSellToken}`);
  };

  const coins = tokens.map((token) => token.name);

  return (
    <div className="flex flex-col space-y-4 bg-darkGreen2 rounded-md shadow-lg p-6 h-fit">
      <label className="text-lightGreen">Amount</label>
      <input
        className="border border-lightGreen rounded-md p-2 bg-darkGreen"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <label className="text-lightGreen">Price</label>
      <input
        className="border border-lightGreen rounded-md p-2 bg-darkGreen"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {/* Dropdown for selecting coin to buy */}
      <div className="flex flex-row space-x-2">
        <div className="flex justify-between items-center flex-grow">
          <label className="text-lightGreen">Select Coin to Buy</label>
          <select
            className="border border-lightGreen rounded-md p-2 w-1/2 bg-darkGreen"
            onChange={(e) => setSelectedBuyToken(e.target.value)}
            value={selectedBuyToken}
          >
            <option value={""}>Select Coin</option>
            {coins.map((coin) => (
              <option key={coin} value={coin}>
                {coin}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center flex-grow">
          {/* Dropdown for selecting coin to sell */}
          <label className="text-lightGreen ">Select Coin to Sell</label>
          <select
            className="border border-lightGreen rounded-md p-2 w-1/2 bg-darkGreen"
            onChange={(e) => setSelectedSellToken(e.target.value)}
            value={selectedSellToken}
          >
            <option value={""}>Select Coin</option>
            {coins.map((coin) => (
              <option key={coin} value={coin}>
                {coin}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          className="bg-lightGreen w-full text-darkGreen rounded-md p-2 mt-2 transform hover:scale-105 transition-transform"
          onClick={handleBuy}
        >
          Buy
        </button>
        <button
          className="bg-red-500 text-white  w-full rounded-md p-2 mt-2 transform hover:scale-105 transition-transform"
          onClick={handleSell}
        >
          Sell
        </button>
      </div>
    </div>
  );
}

export default OrderForm;
