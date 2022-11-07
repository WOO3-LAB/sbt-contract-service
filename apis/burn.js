var express = require('express')
var router = express.Router()
const { parseUnits ,formatUnits} = require("ethers/lib/utils");
const {getContract,msgFormat,failedFormat,getProvider}=require('../utils')

router.post('/',async function (req, res) {
    const {tokenId,contractAddress}=req.body
    if(!tokenId) return res.send(failedFormat('required tokenId'))
    if(!contractAddress) return res.send(failedFormat('required contractAddress'))
    try {
        const contract=getContract(contractAddress)
        const provider=getProvider()
        const price_unit = "gwei";
        const price = formatUnits(await provider.getGasPrice(), price_unit);
        contract.callStatic.burn(tokenId).then(async(success)=>{
            if(success){
                const tx=await contract.burn(tokenId,{
                    gasLimit: 3000000,
                    gasPrice: parseUnits(price, price_unit),
                })
                const txRes=await tx.wait()
                return res.send(msgFormat(txRes))
            }else{
                return res.send(failedFormat('failed burn'))
            }
        }).catch(err=>res.send(failedFormat(err)))
    } catch (error) {
        res.send(failedFormat(error.message||error))
    }
    
})

module.exports = router