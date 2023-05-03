const express = require('express')

const router  = express.Router()


const Candidate = require('../models/createCandidate')
//Getting all

router.get('/',async (req,res)=>{
    try{
        const candidates = await Candidate.find()
        res.json(candidates)
    }catch (err){
        res.status(500).json({message:err.message})
    }

})
//getting one
router.get('/:aadharNumber',getCandidateDetails,async (req,res)=>{
    res.send(res.candidate)

})

/*
//getting one
router.get('/:id',getCandidate,(req,res)=>{
    res.send(res.candidate.name)

})
*/
//creating one
router.post('/',async (req,res)=>{
    const candidate = new Candidate({
        name:req.body.name,
        aadharNumber:req.body.aadharNumber,
        phoneNumber:req.body.phoneNumber,
        party:req.body.party,
        partyLogoUrl:req.body.partyLogoUrl
    })
    try {
        const newCandidate = await candidate.save()
        res.status(201).json(newCandidate)
    }catch (err){
        res.status(400).json({message:err.message})

    }
    
})
//updating one
router.patch('/:id',getCandidate,async (req,res)=>{
    if (req.body.name != null){
        res.candidate.name = req.body.name
    }
    if (req.body.aadharNumber != null){
        res.candidate.aadharNumber = req.body.aadharNumber
    }
    if (req.body.phoneNumber != null){
        res.candidate.phoneNumber = req.body.phoneNumber
    }
    if (req.body.party != null){
        res.candidate.party = req.body.party
    }
    try {
        const updateCandidate = await res.candidate.save()
        res.json(updateCandidate)

    }catch(err){
        res.status(400).json({message:err.message})
    }

    
})
//deletingone
router.delete('/:id',getCandidate,async (req,res)=>{

    try {
        await res.candidate.remove()
        res.json({message:"deleted successfuly"})
    }catch(err){
        res.status(500).json({message:err.message})
    }

    
})
//getting user detail

async function getCandidateDetails (req,res,next){
    let candidate
    try{
        let query = {aadharNumber: String(req.params.aadharNumber)};
        candidate = await Candidate.findOne(query)
        if (candidate == null){
            return res.status(404).json({message:'Cannot find candidate with aadhar'})
        }
    }catch (err){
        return res.status(500).json({message:"user not found"})
    }
    res.candidate = candidate
    next()
}


async function getCandidate (req,res,next){
    let candidate
    try{
        candidate = await Candidate.findById(req.params.id)
        if (candidate == null){
            return res.status(404).json({message:'Cannot find candidate'})
        }
    }catch (err){
        return res.status(500).json({message:"user not found"})
    }
    res.candidate = candidate
    next()
}
module.exports= router