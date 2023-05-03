const express = require('express')

const router  = express.Router()


const Admin = require('../models/admin')
//Getting all

router.get('/',async (req,res)=>{
    try{
        const admins = await Admin.find()
        res.json(admins)
    }catch (err){
        res.status(500).json({message:err.message})
    }

})
//getting one
router.get('/:employeeId',getAdminDetails,async (req,res)=>{
    res.send(res.admin)

})

//creating one
router.post('/',async (req,res)=>{
    const admin = new Admin({
        name:req.body.name,
        employeeId:req.body.employeeId,
        password:req.body.password,
        phoneNumber:req.body.phoneNumber
    })
    try {
        const newAdmin = await admin.save()
        res.status(201).json(newAdmin)
    }catch (err){
        res.status(400).json({message:err.message})

    }
    
})


//getting user detail

async function getAdminDetails (req,res,next){
    let admin
    try{
        let query = {employeeId: String(req.params.employeeId)};
        admin = await Admin.findOne(query)
        if (admin == null){
            return res.status(404).json({message:'Cannot find admin with employeeId'})
        }
    }catch (err){
        return res.status(500).json({message:"admin not found"})
    }
    res.admin = admin
    next()
}

module.exports= router