import { ethers, JsonRpcProvider } from "ethers";

let provider;

const abi = [
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
];
export const contract_address = "0x9a03bacc4A7C6936CAAA3DF6ecbC8102Bf5c7Bc7";

export const getContract = async (signer = null) => {
  provider = new JsonRpcProvider("https://rpc.testnet.mantle.xyz/");
  return new ethers.Contract(contract_address, abi, signer || provider);
};
