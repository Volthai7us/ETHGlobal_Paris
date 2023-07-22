import Navbar from "./components/Navbar";
// import LiquidityTable from "./components/LiquidityTable";
import OrdersTable from "./components/OrdersTable";
import OrderForm from "./components/OrderForm";
import { useState } from "react";

export default function Orderbook() {
  const [selectedBuyToken, setSelectedBuyToken] = useState("DAI");
  const [selectedSellToken, setSelectedSellToken] = useState("USDT");

  const tokens = [
    {
      name: "DAI",
      address: "0xa35d7f5dd89a336A427Ebb63C428C3068b6c3105",
    },
    {
      name: "USDT",
      address: "0xbAF72402f98f16e77638Ce5FCC5689CD1627E8ff",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 px-4 gap-10 py-5 bg-darkGreen min-h-screen text-white">
        <OrderForm
          tokens={tokens}
          selectedBuyToken={selectedBuyToken}
          selectedSellToken={selectedSellToken}
          setSelectedBuyToken={setSelectedBuyToken}
          setSelectedSellToken={setSelectedSellToken}
        />
        {/* <LiquidityTable /> */}
        <OrdersTable
          tokens={tokens}
          selectedBuyToken={selectedBuyToken}
          selectedSellToken={selectedSellToken}
        />
      </div>
    </>
  );
}
