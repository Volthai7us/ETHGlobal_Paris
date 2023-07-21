function LiquidityTable() {
  return (
    <div className="flex flex-col p-2 space-y-4 bg-darkGreen2 rounded-md shadow-lg h-fit">
      <h1 className="text-2xl">Liquidity</h1>

      <table className="table-auto w-full text-white">
        <thead>
          <tr>
            <th className="px-4 py-2 text-lightGreen">Price</th>
            <th className="px-4 py-2 text-lightGreen">Amount</th>
            <th className="px-4 py-2 text-lightGreen">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-darkGreen2">
            <td className="border border-lightGreen px-4 py-2">100</td>
            <td className="border border-lightGreen px-4 py-2">1</td>
            <td className="border border-lightGreen px-4 py-2">100</td>
          </tr>
          <tr className="hover:bg-darkGreen2">
            <td className="border border-lightGreen px-4 py-2">100</td>
            <td className="border border-lightGreen px-4 py-2">1</td>
            <td className="border border-lightGreen px-4 py-2">100</td>
          </tr>
        </tbody>
      </table>
      <table className="table-auto w-full text-white">
        <thead>
          <tr>
            <th className="px-4 py-2 text-lightGreen">Price</th>
            <th className="px-4 py-2 text-lightGreen">Amount</th>
            <th className="px-4 py-2 text-lightGreen">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-darkGreen2">
            <td className="border border-lightGreen px-4 py-2">100</td>
            <td className="border border-lightGreen px-4 py-2">1</td>
            <td className="border border-lightGreen px-4 py-2">100</td>
          </tr>
          <tr className="hover:bg-darkGreen2">
            <td className="border border-lightGreen px-4 py-2">100</td>
            <td className="border border-lightGreen px-4 py-2">1</td>
            <td className="border border-lightGreen px-4 py-2">100</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LiquidityTable;
