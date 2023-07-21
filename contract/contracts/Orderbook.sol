// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract OrderBook {
    struct Order {
        uint id;
        address trader;
        bool isBuyOrder;
        uint price;
        uint amount;
    }

    address public owner;
    uint public nextOrderId = 0;
    mapping(uint => Order) public orders;
    uint[] public orderIds;

    constructor() {
        owner = msg.sender;
    }

    function placeOrder(bool _isBuyOrder, uint _price, uint _amount) public {
        orders[nextOrderId] = Order(nextOrderId, msg.sender, _isBuyOrder, _price, _amount);
        orderIds.push(nextOrderId);

        for(uint i = 0; i < orderIds.length; i++){
            // Buy order should match with a sell order with price less or equal
            // Sell order should match with a buy order with price greater or equal
            if(
                (orders[i].isBuyOrder != _isBuyOrder) &&
                (_isBuyOrder && orders[i].price <= _price || !_isBuyOrder && orders[i].price >= _price)
            ){
                // Match found, execute trade
                // For simplicity, we assume all orders are for 1 token only
                if(_isBuyOrder){
                    // Ensure the buyer has enough Ether
                    require(msg.sender.balance >= _price, "Not enough balance");
                    // Transfer Ether from buyer to seller
                    payable(orders[i].trader).transfer(_price);
                } else {
                    // For a complete implementation, we should also transfer tokens from seller to buyer
                }

                // Update or delete the matched order
                if(orders[i].amount > 1){
                    orders[i].amount--;
                } else {
                    delete orders[i];
                }

                // Update or delete the placed order
                if(_amount > 1){
                    orders[nextOrderId].amount--;
                } else {
                    delete orders[nextOrderId];
                }

                break;
            }
        }

        if(orders[nextOrderId].amount > 0){
            nextOrderId++;
        }
    }

    function getOrder(uint _orderId) public view returns(uint, address, bool, uint, uint) {
        return (
            orders[_orderId].id,
            orders[_orderId].trader,
            orders[_orderId].isBuyOrder,
            orders[_orderId].price,
            orders[_orderId].amount
        );
    }

    function getAllOrders() public view returns(uint[] memory) {
        return orderIds;
    }

    function cancelOrder(uint _orderId) public {
        require(msg.sender == orders[_orderId].trader, "Not the trader");
        delete orders[_orderId];
        for (uint i = 0; i < orderIds.length; i++){
            if (orderIds[i] == _orderId){
                orderIds[i] = orderIds[orderIds.length - 1];
                orderIds.pop();
                break;
            }
        }
    }

    function lastOrderId() public view returns(uint) {
        return nextOrderId;
    }
}
