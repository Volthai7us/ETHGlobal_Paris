import Navbar from "./components/Navbar";
// import LiquidityTable from "./components/LiquidityTable";
import OrdersTable from "./components/OrdersTable";
import OrderForm from "./components/OrderForm";
import { useState } from "react";
import { useNetwork } from "wagmi";
export default function Orderbook() {
  const { chain } = useNetwork();

  let tokens = [
    {
      name: "USDT",
      address: "0xbAF72402f98f16e77638Ce5FCC5689CD1627E8ff",
      network: "Mantle Testnet",
    },
    {
      name: "DAI",
      address: "0xa35d7f5dd89a336A427Ebb63C428C3068b6c3105",
      network: "Mantle Testnet",
    },
    {
      name: "APE",
      address: "0xB7b31a6BC18e48888545CE79e83E06003bE70930",
      network: "Polygon",
    },
    {
      name: "ZKB",
      address: "0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B",
      network: "Polygon",
    },
  ];

  tokens = tokens.filter((token) => token.network === chain.name);

  const [selectedBuyToken, setSelectedBuyToken] = useState(tokens[0].name);
  const [selectedSellToken, setSelectedSellToken] = useState(tokens[1].name);

  if (chain === undefined) {
    return (
      <>
        <Navbar />
        <div className="grid grid-cols-1 px-4 gap-10 py-5 bg-darkGreen min-h-screen text-white">
          <h1 className="text-2xl font-bold">Please connect to a network</h1>
        </div>
      </>
    );
  }

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
