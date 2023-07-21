import Navbar from "./components/Navbar";
import LiquidityTable from "./components/LiquidityTable";
import OrdersTable from "./components/OrdersTable";
import OrderForm from "./components/OrderForm";

export default function Orderbook() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 px-4 gap-10 py-5 bg-darkGreen min-h-screen text-white">
        <OrderForm />
        <LiquidityTable />
        <OrdersTable />
      </div>
    </>
  );
}
