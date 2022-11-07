var express = require('express')
var router = express.Router()
const {msgFormat,failedFormat,log}=require('../utils')
const {deploy}=require('../scripts/deploy')
const {compile}=require('../scripts/compile');


router.get('/',async function (req, res) {
    const {name}=req.query
    if(!name) return res.send(failedFormat('required name'))
    try {
        const {abi,bytecode}=compile(name)
        const address=await deploy(abi,bytecode)
        res.send(msgFormat(address))
    } catch (error) {
        log(error)
        res.send(failedFormat(error.message||error))
    }
    
})

module.exports = router