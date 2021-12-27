const Order = require("../models/order.js");
exports.getCart = async (req, res) => {
    try {
        return res.status(200).json({
            data: req.cart
        })
    }
    catch (err) {
        return res.status(500).json({
            err: "error in fetching the cart"
        })
    }
}

exports.findOrderByUserId = async (req, res,) => {
    //finding cart by userId ;
    try {
        let id = req.params.orderId;
        let orders = await Order.find({ userId: id });
        //req.userId = userId;
        //req.order = order;
        return res.status(200).json({
            data: orders
        })
        //next();
    }
    catch (err) {
        return res.status(500).json({
            err: "error in fetching the order"
        })
    }
}

exports.findOrderById = async (req, res) => {
    //finding cart by userId ;
    try {
        let id = req.params.orderId
        let order = await Order.find({ _id: id });
        return res.status(200).json({
            data: order
        })
    }
    catch (err) {
        return res.status(500).json({
            err: "error in fetching the order"
        })
    }
}