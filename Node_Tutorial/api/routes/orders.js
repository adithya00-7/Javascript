const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'handling orders requests'
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'handling new order creation'
    })
})

 module.exports=router;