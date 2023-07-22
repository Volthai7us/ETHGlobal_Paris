// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./IERC20.sol";

contract OrderBook {
    struct Order {
        uint id;
        address trader;
        IERC20 tokenToSell;
        uint amountToSell;
        IERC20 tokenToBuy;
        uint amountToBuy;
    }

    address public owner;
    uint public nextOrderId = 0;
    mapping(uint => Order) public orders;
    uint[] public orderIds;

    constructor() {
        owner = msg.sender;
    }

    function placeOrder(IERC20 _tokenToSell, uint _amountToSell, IERC20 _tokenToBuy, uint _amountToBuy) public {
        orders[nextOrderId] = Order(nextOrderId, msg.sender, _tokenToSell, _amountToSell, _tokenToBuy, _amountToBuy);
        orderIds.push(nextOrderId);
        nextOrderId++;
    }

    function matchOrders(uint _orderId1, uint _orderId2) public {
        Order storage order1 = orders[_orderId1];
        Order storage order2 = orders[_orderId2];

        // Ensure that the two orders are complementary
        require(order1.tokenToSell == order2.tokenToBuy, "Tokens do not match");
        require(order1.tokenToBuy == order2.tokenToSell, "Tokens do not match");
        require(order1.amountToSell == order2.amountToBuy, "Amounts do not match");
        require(order1.amountToBuy == order2.amountToSell, "Amounts do not match");

        // Transfer the tokens between the traders
        require(order1.tokenToSell.transferFrom(order1.trader, order2.trader, order1.amountToSell), "Transfer failed");
        require(order2.tokenToSell.transferFrom(order2.trader, order1.trader, order2.amountToSell), "Transfer failed");

        // Delete the orders
        delete orders[_orderId1];
        delete orders[_orderId2];

        // Remove the orders from the orderIds array
        for (uint i = 0; i < orderIds.length; i++){
            if (orderIds[i] == _orderId1 || orderIds[i] == _orderId2){
                orderIds[i] = orderIds[orderIds.length - 1];
                orderIds.pop();
            }
        }
    }

    function getOrder(uint _orderId) public view returns(uint, address, IERC20, uint, IERC20, uint) {
        return (
            orders[_orderId].id,
            orders[_orderId].trader,
            orders[_orderId].tokenToSell,
            orders[_orderId].amountToSell,
            orders[_orderId].tokenToBuy,
            orders[_orderId].amountToBuy
        );
    }

    function getAllOrders() public view returns(uint[] memory) {
        return orderIds;
    }

    function cancelOrder(uint _orderId) public {
        require(orders[_orderId].trader == msg.sender, "Not the trader");
        delete orders[_orderId];

        // Remove the order from the orderIds array
        for (uint i = 0; i < orderIds.length; i++){
            if (orderIds[i] == _orderId){
                orderIds[i] = orderIds[orderIds.length - 1];
                orderIds.pop();
            }
        }
    }
}
