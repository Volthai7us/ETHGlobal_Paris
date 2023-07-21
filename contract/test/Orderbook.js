const { expect } = require("chai");

function parseOrder(order) {
  return {
    id: order[0].toNumber(),
    trader: order[1],
    isBuyOrder: order[2],
    price: order[3].toNumber(),
    amount: order[4].toNumber(),
  };
}

describe("OrderBook", function () {
  let OrderBook, orderBook, owner, addr1, addr2;

  beforeEach(async function () {
    OrderBook = await ethers.getContractFactory("OrderBook");
    [owner, addr1, addr2] = await ethers.getSigners();
    orderBook = await OrderBook.deploy();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await orderBook.owner()).to.equal(owner.address);
    });
  });

  describe("Orders", function () {
    it("Should create orders correctly", async function () {
      await orderBook.connect(addr1).placeOrder(true, 100, 1);
      const order = parseOrder(await orderBook.getOrder(0));

      expect(order.trader).to.equal(addr1.address);
      expect(order.isBuyOrder).to.equal(true);
      expect(order.price).to.equal(100);
      expect(order.amount).to.equal(1);
    });

    it("Should cancel orders correctly", async function () {
      await orderBook.connect(addr1).placeOrder(true, 100, 1);
      await orderBook.connect(addr1).cancelOrder(0);
      const order = parseOrder(await orderBook.getOrder(0));
      expect(order.trader).to.equal(ethers.constants.AddressZero);
    });

    it("Should match orders correctly", async function () {
      await orderBook.connect(addr1).placeOrder(true, 100, 1);
      await orderBook.connect(addr2).placeOrder(false, 100, 1);
      const order1 = parseOrder(await orderBook.getOrder(0));
      const order2 = parseOrder(await orderBook.getOrder(1));
      expect(order1.trader).to.equal(ethers.constants.AddressZero);
      expect(order2.trader).to.equal(ethers.constants.AddressZero);
    });

    it("Should reject non-owner order cancellation", async function () {
      await orderBook.connect(addr1).placeOrder(true, 100, 1);
      await expect(orderBook.connect(addr2).cancelOrder(0)).to.be.revertedWith(
        "Not the trader"
      );
    });
  });
});
