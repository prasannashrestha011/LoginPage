const Router=require('express')
const router=Router()
const homeRoute=require('./home.js')

router.use(homeRoute)

module.exports=router