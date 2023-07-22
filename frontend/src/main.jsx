import ReactDOM from "react-dom/client";
import Orderbook from "./Orderbook.jsx";
import "./output.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, mantleTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
const { chains, publicClient } = configureChains(
  [mantleTestnet, polygon],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Trusty Order",
  projectId: "trust-order-1",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Orderbook />} />
        </Routes>
      </BrowserRouter>
    </RainbowKitProvider>
  </WagmiConfig>
);
