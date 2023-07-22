import ReactDOM from "react-dom/client";
import Orderbook from "./Orderbook.jsx";
import "./output.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  polygonMumbai,
  mantleTestnet,
  lineaTestnet,
  zkSyncTestnet,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
const { chains, publicClient } = configureChains(
  [mantleTestnet, polygonMumbai, lineaTestnet, zkSyncTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
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
