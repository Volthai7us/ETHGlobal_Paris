import { getContract } from "../api/index";
import { useEffect, useState } from "react";

function OrdersTable() {
  const [orders, setOrders] = useState([]);

  function parseOrder(order) {
    return {
      id: order[0].toString(),
      trader: order[1],
      isBuyOrder: order[2],
      price: order[3].toString(),
      amount: order[4].toString(),
    };
  }

  function addressShortener(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  useEffect(() => {
    setOrders([]);
    getContract().then((contract) => {
      contract.lastOrderId().then((lastOrderId) => {
        for (let i = 0; i < lastOrderId; i++) {
          contract.orders(i).then((order) => {
            if (order) {
              setOrders((prevOrders) => [
                ...prevOrders,
                parseOrder(order.toArray()),
              ]);
            }
          });
        }
      });
    });
  }, []);

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
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className={index % 2 === 0 ? "bg-darkGreen2" : "bg-darkGreen3"}
            >
              <td className="border border-lightGreen px-4 py-2">{order.id}</td>
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
                {order.price}
              </td>
              <td className="border border-lightGreen px-4 py-2">
                {order.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
