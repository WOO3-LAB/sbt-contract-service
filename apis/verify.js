var express = require('express')
var router = express.Router()
const {verify,verifyStatus}=require('../scripts/verify');
const fs = require("fs");
const path = require("path");
const {msgFormat,failedFormat,log}=require('../utils')


router.post('/',async function (req, res) {
    const {address,name,chainId}=req.body
    const contractName=name+'SBT'
    try {
        let sourceCode=fs.readFileSync(path.resolve(__dirname,'../compiled/','input.json'),"utf-8")
        sourceCode=sourceCode.replace(/WooTemplate/g,contractName)
        const result=await verify(address,sourceCode,contractName,chainId)
        if(result.status=='1'){
            res.send(msgFormat(result.result))
        }else{
            res.send(failedFormat(result))
        }
    } catch (error) {
        log(error)
        res.send(failedFormat(error.message||error))
    }
})

router.post('/status',async function (req, res) {
    const {guid,chainId}=req.body
    try {
        const result=await verifyStatus(guid,chainId)
        if(result.status=='1'||(result.status==='0'&&result.result==='Already Verified')){
            res.send(msgFormat(result.result))
        }else{
            res.send(failedFormat(result))
        }
    } catch (error) {
        log(error)
        res.send(failedFormat(error.message||error))
    }
})

module.exports = router