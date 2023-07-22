const { expect } = require("chai");
const { ethers } = require("hardhat");

function parseOrder(order) {
  return {
    id: order[0].toNumber(),
    trader: order[1],
    tokenToSell: order[2],
    amountToSell: order[3].toNumber(),
    tokenToBuy: order[4],
    amountToBuy: order[5].toNumber(),
  };
}

describe("OrderBook", function () {
  let OrderBook, ERC20, orderBook, tokenA, tokenB, owner, addr1, addr2;

  beforeEach(async function () {
    OrderBook = await ethers.getContractFactory("OrderBook");
    ERC20 = await ethers.getContractFactory("Apecoin");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the order book and ERC20 tokens
    orderBook = await OrderBook.deploy();
    tokenA = await ERC20.deploy("Apecoin", "APE");
    tokenB = await ERC20.deploy("ZK Bob", "ZKB");

    tokenA.connect(owner).transfer(addr1.address, "100000");
    tokenB.connect(owner).transfer(addr2.address, "100000");

    // Distribute tokens to the test addresses
    await tokenA.transfer(addr1.address, "100");
    await tokenB.transfer(addr2.address, "100");
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await orderBook.owner()).to.equal(owner.address);
    });
  });

  describe("Orders", function () {
    it("Should create orders correctly", async function () {
      await tokenA.connect(addr1).approve(orderBook.address, "100");
      await orderBook
        .connect(addr1)
        .placeOrder(tokenA.address, "100", tokenB.address, "200");
      const order = parseOrder(await orderBook.getOrder(0));

      expect(order.trader).to.equal(addr1.address);
      expect(order.tokenToSell).to.equal(tokenA.address);
      expect(order.amountToSell).to.equal(100);
      expect(order.tokenToBuy).to.equal(tokenB.address);
      expect(order.amountToBuy).to.equal(200);
    });

    it("Should cancel orders correctly", async function () {
      await tokenA.connect(addr1).approve(orderBook.address, "100");
      await orderBook
        .connect(addr1)
        .placeOrder(tokenA.address, "100", tokenB.address, "200");
      await orderBook.connect(addr1).cancelOrder(0);
      const order = parseOrder(await orderBook.getOrder(0));
      expect(order.trader).to.equal(ethers.constants.AddressZero);
    });

    it("Should match orders correctly", async function () {
      await tokenA.connect(addr1).approve(orderBook.address, "100");
      await tokenB.connect(addr2).approve(orderBook.address, "200");

      await orderBook
        .connect(addr1)
        .placeOrder(tokenA.address, "100", tokenB.address, "200");
      await orderBook
        .connect(addr2)
        .placeOrder(tokenB.address, "200", tokenA.address, "100");

      await orderBook.connect(owner).matchOrders(0, 1);

      const order1 = parseOrder(await orderBook.getOrder(0));
      const order2 = parseOrder(await orderBook.getOrder(1));

      expect(order1.trader).to.equal(ethers.constants.AddressZero);
      expect(order2.trader).to.equal(ethers.constants.AddressZero);
    });

    it("Should reject non-owner order cancellation", async function () {
      await tokenA.connect(addr1).approve(orderBook.address, "100");
      await orderBook
        .connect(addr1)
        .placeOrder(tokenA.address, "100", tokenB.address, "200");
      await expect(orderBook.connect(addr2).cancelOrder(0)).to.be.revertedWith(
        "Not the trader"
      );
    });
  });
});
