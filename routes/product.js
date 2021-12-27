const express = require('express');
const router = express.Router();
const {addProd,getAllProd,getProd,productById} = require("../controllers/product")

router.post('/product/add',addProd);
router.get('/product/all',getAllProd);
router.get('/product/:prodId',getProd);

router.param("prodId",productById);
module.exports = router;
