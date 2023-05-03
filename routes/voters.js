const express = require('express')

const router  = express.Router()


const Voter = require('../models/voter')
//Getting all

router.get('/',async (req,res)=>{
    try{
        const voters = await Voter.find()
        res.json(voters)
    }catch (err){
        res.status(500).json({message:err.message})
    }

})
//getting one
router.get('/:aadharNumber',getVoterDetails,async (req,res)=>{
    res.send(res.voter)

})

/*
//getting one
router.get('/:id',getVoter,(req,res)=>{
    res.send(res.voter.name)

})
*/
//creating one
router.post('/',async (req,res)=>{
    const voter = new Voter({
        name:req.body.name,
        aadharNumber:req.body.aadharNumber,
        password:req.body.password,
        phoneNumber:req.body.phoneNumber
    })
    try {
        const newVoter = await voter.save()
        res.status(201).json(newVoter)
    }catch (err){
        res.status(400).json({message:err.message})

    }
    
})
//updating one
router.patch('/:id',getVoter,async (req,res)=>{
    if (req.body.name != null){
        res.voter.name = req.body.name
    }
    if (req.body.aadharNumber != null){
        res.voter.aadharNumber = req.body.aadharNumber
    }
    if (req.body.phoneNumber != null){
        res.voter.phoneNumber = req.body.phoneNumber
    }try {
        const updateVoter = await res.voter.save()
        res.json(updateVoter)

    }catch(err){
        res.status(400).json({message:err.message})
    }

    
})
//deletingone
router.delete('/:id',getVoter,async (req,res)=>{

    try {
        await res.voter.remove()
        res.json({message:"deleted successfuly"})
    }catch(err){
        res.status(500).json({message:err.message})
    }

    
})
//getting user detail

async function getVoterDetails (req,res,next){
    let voter
    try{
        let query = {aadharNumber: String(req.params.aadharNumber)};
        voter = await Voter.findOne(query)
        if (voter == null){
            return res.status(404).json({message:'Cannot find voter with aadhar'})
        }
    }catch (err){
        return res.status(500).json({message:"user not found"})
    }
    res.voter = voter
    next()
}


async function getVoter (req,res,next){
    let voter
    try{
        voter = await Voter.findById(req.params.id)
        if (voter == null){
            return res.status(404).json({message:'Cannot find voter'})
        }
    }catch (err){
        return res.status(500).json({message:"user not found"})
    }
    res.voter = voter
    next()
}
module.exports= router