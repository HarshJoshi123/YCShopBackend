const express = require('express');
const {CartControllers} = require('./controllers');

const router = express.Router();

router.get('/cart/add/:userId',authMid,getCart);
router.post('/cart/get/:userId',authMid,addToCart);

router.param("userId",findCartById);
module.exports = router;
