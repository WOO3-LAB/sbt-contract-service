var express = require('express')
var router = express.Router()
const { parseUnits ,formatUnits} = require("ethers/lib/utils");
const {getContract,msgFormat,failedFormat,getProvider, log}=require('../utils')

router.post('/',async function (req, res) {
    const {tokenId,contractAddress,chainId}=req.body
    if(!tokenId) return res.send(failedFormat('required tokenId'))
    if(!contractAddress) return res.send(failedFormat('required contractAddress'))
    if(!chainId) return res.send(failedFormat('required chainId'))
    try {
        const contract=getContract(contractAddress,chainId)
        const provider=getProvider(chainId)
        const price_unit = "gwei";
        const price = formatUnits(await provider.getGasPrice(), price_unit);
        log('burn',tokenId,chainId,contractAddress)
        if(chainId=='23294'||chainId=='23295'){
            const tx=await contract.burn(tokenId,{
                gasLimit: 3000000,
                gasPrice: parseUnits((price*1.2).toFixed(6), price_unit),
            })
            return res.send(msgFormat({...tx,transactionHash:tx.hash}))
        }else{
            contract.callStatic.burn(tokenId).then(async(success)=>{
                if(success){
                    const tx=await contract.burn(tokenId,{
                        gasLimit: 3000000,
                        gasPrice: parseUnits((price*1.2).toFixed(6), price_unit),
                    })
                    return res.send(msgFormat({...tx,transactionHash:tx.hash}))
                    // const txRes=await tx.wait()
                    // return res.send(msgFormat(txRes))
                }else{
                    return res.send(failedFormat('failed burn'))
                }
            }).catch(err=>res.send(failedFormat(err)))
        }
    } catch (error) {
        res.send(failedFormat(error.message||error))
    }
    
})

module.exports = router