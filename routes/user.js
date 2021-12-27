const express = require('express');
const {Login,Signup,authMid,getAll} = require('../controllers/user.js');
const router = express.Router();

router.post('/login',Login) ;
router.get('/users',authMid,getAll) ;
router.post('/signup',Signup) ;

module.exports = router;