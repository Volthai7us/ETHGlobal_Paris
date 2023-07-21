function OrderForm() {
  const handleBuy = () => {
    // Alım işlemini gerçekleştirmek için gerekli kodlar burada olacak.
    console.log("Buy button clicked!");
  };

  const handleSell = () => {
    // Satım işlemini gerçekleştirmek için gerekli kodlar burada olacak.
    console.log("Sell button clicked!");
  };

  return (
    <form className="flex flex-col space-y-4 bg-darkGreen2 rounded-md shadow-lg p-6 h-fit">
      <label className="text-lightGreen">Amount</label>
      <input className="border border-lightGreen rounded-md p-2 bg-darkGreen" />
      <label className="text-lightGreen">Price</label>
      <input className="border border-lightGreen rounded-md p-2 bg-darkGreen" />
      <div className="flex space-x-4">
        <button
          className="bg-lightGreen w-full text-darkGreen rounded-md p-2 mt-2 transform hover:scale-105 transition-transform"
          onClick={handleBuy}
        >
          Buy
        </button>
        <button
          className="bg-red-500 text-white  w-full rounded-md p-2 mt-2 transform hover:scale-105 transition-transform"
          onClick={handleSell}
        >
          Sell
        </button>
      </div>
    </form>
  );
}

export default OrderForm;
