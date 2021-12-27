const express = require('express');
const router = express.Router();
const { authMid } = require("../controllers/user.js");
const { getOrder,findOrderById,findOrderByUserId } = require("../controllers/order.js");

router.get('/order/:userId/:orderId',authMid,findOrderById);
router.get('/order/:userId/all', authMid, findOrderByUserId);
//router.post('/order/create', authMid,createOrder);

// router.param("userId",userById)
// router.param("orderId",orderById);
module.exports = router;
