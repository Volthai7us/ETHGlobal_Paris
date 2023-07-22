import { useState } from "react";
import { ethers, JsonRpcProvider } from "ethers";
import { getContract } from "../api";
import { contract_address } from "../api";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

function OrderForm({
  tokens,
  setSelectedBuyToken,
  setSelectedSellToken,
  selectedBuyToken,
  selectedSellToken,
}) {
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const { config: approveConfig } = usePrepareContractWrite({
    address: tokens.find((token) => token.name == selectedSellToken).address,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "approve",
    args: [contract_address, 10000],
  });

  const { write: writeApprove } = useContractWrite(approveConfig);

  const { config: buyConfig } = usePrepareContractWrite({
    address: contract_address,
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_orderId",
            type: "uint256",
          },
        ],
        name: "cancelOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getAllOrders",
        outputs: [
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_orderId",
            type: "uint256",
          },
        ],
        name: "getOrder",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "contract IERC20",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "contract IERC20",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_orderId1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_orderId2",
            type: "uint256",
          },
        ],
        name: "matchOrders",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "nextOrderId",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "orderIds",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "orders",
        outputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "contract IERC20",
            name: "tokenToSell",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountToSell",
            type: "uint256",
          },
          {
            internalType: "contract IERC20",
            name: "tokenToBuy",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountToBuy",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "contract IERC20",
            name: "_tokenToSell",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_amountToSell",
            type: "uint256",
          },
          {
            internalType: "contract IERC20",
            name: "_tokenToBuy",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_amountToBuy",
            type: "uint256",
          },
        ],
        name: "placeOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "placeOrder",
    args: [
      tokens.find((token) => token.name == selectedSellToken).address,
      amount,
      tokens.find((token) => token.name == selectedBuyToken).address,
      price,
    ],
  });

  const { config: sellConfig } = usePrepareContractWrite({
    address: contract_address,
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_orderId",
            type: "uint256",
          },
        ],
        name: "cancelOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getAllOrders",
        outputs: [
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_orderId",
            type: "uint256",
          },
        ],
        name: "getOrder",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "contract IERC20",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "contract IERC20",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_orderId1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_orderId2",
            type: "uint256",
          },
        ],
        name: "matchOrders",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "nextOrderId",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "orderIds",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "orders",
        outputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "contract IERC20",
            name: "tokenToSell",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountToSell",
            type: "uint256",
          },
          {
            internalType: "contract IERC20",
            name: "tokenToBuy",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountToBuy",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "contract IERC20",
            name: "_tokenToSell",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_amountToSell",
            type: "uint256",
          },
          {
            internalType: "contract IERC20",
            name: "_tokenToBuy",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_amountToBuy",
            type: "uint256",
          },
        ],
        name: "placeOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "placeOrder",
    args: [
      tokens.find((token) => token.name == selectedSellToken).address,
      amount,
      tokens.find((token) => token.name == selectedBuyToken).address,
      price,
    ],
  });

  const { write: writeBuy } = useContractWrite(buyConfig);
  const { write: writeSell } = useContractWrite(sellConfig);

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
      <button
        className="bg-lightGreen w-full text-darkGreen rounded-md p-2 mt-2 transform hover:scale-105 transition-transform"
        onClick={() => writeApprove?.()}
        disabled={!writeApprove}
      >
        Approve
      </button>
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
          onClick={() => writeBuy?.()}
          disabled={!writeBuy}
        >
          Buy
        </button>
        <button
          className="bg-red-500 text-white  w-full rounded-md p-2 mt-2 transform hover:scale-105 transition-transform"
          onClick={() => writeSell?.()}
          disabled={!writeSell}
        >
          Sell
        </button>
      </div>
    </div>
  );
}

export default OrderForm;
