const router=require('express').Router()
const User=require('../controller/app.controller')
router.get("/",User.addUser)
router.post("/",User.addUserLogic)
router.get("/all",User.showAll)
router.get("/single/:id", User.singleUser)
router.get("/edit/:id",User.EditUser)
router.post("/edit/:id",User.EditUserLogic)
router.get("/delete/:id",User.DeleteUser)
router.get("/addMoney/:id",User.AddMoney)
router.post("/addMoney/:id",User.addMoneyLogic)
router.get("/withdraw/:id",User.withdraw)
router.post("/withdraw/:id",User.withdrawLogic)
module.exports=router