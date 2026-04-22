var express = require("express");
var router = express.Router();
var login = require("../services/login");


router.post('/',login.userlogin);
router.post('/logout',login.userlogout);



module.exports=router;