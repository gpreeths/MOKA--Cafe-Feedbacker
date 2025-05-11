const express=require('express')
const adminRoute=express.Router()
const adminController=require("../controllers/adminController")
const auth=require('../middlewares/adminAuth')


adminRoute.post('/login',adminController.login)
adminRoute.get('/view',auth,adminController.view)
adminRoute.post('/reply/:reviewId',auth,adminController.reply)
adminRoute.get('/totavg',auth,adminController.totAvg)
adminRoute.get('/sort',auth,adminController.sort)
adminRoute.get('/review/:id',adminController.getReviewById)
adminRoute.post('/suggestReply',auth,adminController.suggestReply)
module.exports=adminRoute