import React, { useEffect, useState } from "react";
import { getContract } from "./api";

function App() {
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
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-4 mb-6">Orderbook</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Trader</th>
            <th className="px-4 py-2">Buy/Sell</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            console.log(order);
            return (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.trader}</td>
                <td className="border px-4 py-2">
                  {order.isBuyOrder ? "Buy" : "Sell"}
                </td>
                <td className="border px-4 py-2">{order.price}</td>
                <td className="border px-4 py-2">{order.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
