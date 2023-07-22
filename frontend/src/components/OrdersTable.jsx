import { getContract } from "../api/index";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";

function OrdersTable({ tokens, selectedBuyToken, selectedSellToken }) {
  const [orders, setOrders] = useState([]);
  const { chain } = useNetwork();

  function parseOrder(order) {
    return {
      id: order[0].toString(),
      trader: order[1],
      tokenToSell: order[2],
      amountToSell: order[3].toString(),
      tokenToBuy: order[4],
      amountToBuy: order[5].toString(),
      isBuyOrder:
        order[4] ===
        tokens.find((token) => token.name === selectedBuyToken)?.address,
      isSellOrder:
        order[4] ===
        tokens.find((token) => token.name === selectedSellToken)?.address,
    };
  }

  function addressShortener(address) {
    if (address) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
  }

  useEffect(() => {
    setOrders([]);
    getContract(chain.name).then((contract) => {
      contract.getAllOrders().then((orderIds) => {
        for (let i = 0; i < orderIds.length; i++) {
          contract.orders(orderIds[i]).then((order) => {
            if (order) {
              const parsedOrder = parseOrder(order.toArray());
              setOrders((prevOrders) => [...prevOrders, parsedOrder]);
            }
          });
        }
      });
    });
  }, [selectedBuyToken, selectedSellToken]);

  return (
    <div className="flex flex-col bg-darkGreen2 rounded-md shadow-lg p-6 h-fit">
      <table className="w-full text-white text-center">
        <thead>
          <tr className="bg-darkGreen text-lightGreen">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Trader</th>
            <th className="px-4 py-2">Buy/Sell</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {orders
            .filter((order) => order.isBuyOrder || order.isSellOrder)
            .map((order, index) => {
              return (
                <tr
                  key={order.id}
                  className={
                    index % 2 === 0 ? "bg-darkGreen2" : "bg-darkGreen3"
                  }
                >
                  <td className="border border-lightGreen px-4 py-2">
                    {order.id}
                  </td>
                  <td className="border border-lightGreen px-4 py-2">
                    {addressShortener(order.trader)}
                  </td>
                  <td
                    className={`border border-lightGreen px-4 py-2 ${
                      order.isBuyOrder ? "text-lightGreen" : "text-red-500"
                    }`}
                  >
                    {order.isBuyOrder ? "Buy" : "Sell"}
                  </td>
                  <td className="border border-lightGreen px-4 py-2">
                    {order.amountToBuy / order.amountToSell}
                  </td>
                  <td className="border border-lightGreen px-4 py-2">
                    {order.amountToSell}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
