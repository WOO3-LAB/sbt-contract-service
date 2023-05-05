var express = require('express')
var router = express.Router()
const { parseUnits ,formatUnits} = require("ethers/lib/utils");
const {getContract,msgFormat,failedFormat,getProvider}=require('../utils')

router.post('/',async function (req, res) {
    const {tokenId,uri,contractAddress,chainId}=req.body
    if(!tokenId) return res.send(failedFormat('required tokenId'))
    if(!uri) return res.send(failedFormat('required uri'))
    if(!contractAddress) return res.send(failedFormat('required contractAddress'))
    if(!chainId) return res.send(failedFormat('required chainId'))
    try {
        const contract=getContract(contractAddress,chainId)
        const provider=getProvider(chainId)
        const price_unit = "gwei";
        const price = formatUnits(await provider.getGasPrice(), price_unit);
        if(chainId=='23294'||chainId=='23295'){
            const tx=await contract.update(tokenId,uri,{
                gasLimit: 3000000,
                gasPrice: parseUnits((price*1.2).toFixed(6), price_unit),
            })
            return res.send(msgFormat({...tx,transactionHash:tx.hash}))
        }else{
            contract.callStatic.update(tokenId,uri).then(async(success)=>{
                if(success){
                    const tx=await contract.update(tokenId,uri,{
                        gasLimit: 3000000,
                        gasPrice: parseUnits((price*1.2).toFixed(6), price_unit),
                    })
                    return res.send(msgFormat({...tx,transactionHash:tx.hash}))
                    // const txRes=await tx.wait()
                    // return res.send(msgFormat(txRes))
                }else{
                    return res.send(failedFormat('failed update'))
                }
            }).catch(err=>res.send(failedFormat(err)))
        }
    } catch (error) {
        res.send(failedFormat(error.message||error))
    }
    
})

router.post('/setUpdateMap',async function (req, res) {
    const {data,contractAddress}=req.body
    if(!data) return res.send(failedFormat('required data'))
    if(!contractAddress) return res.send(failedFormat('required contractAddress'))
    const addresses=data.map(i=>i.address)
    const uris=data.map(i=>i.uri)
    const tokenIds=data.map(i=>Number(i.tokenId))
    try {
        const contract=getContract(contractAddress)
        contract.callStatic.setTokenUpdateMap(addresses,uris,tokenIds).then(async(success)=>{
            if(success){
                const tx=await contract.setTokenUpdateMap(addresses,uris,tokenIds)
                const txRes=await tx.wait()
                return res.send(msgFormat(txRes))
            }else{
                return res.send(failedFormat('failed to set update map'))
            }
        }).catch(err=>res.send(failedFormat(err)))
    } catch (error) {
        res.send(failedFormat(error.message||error))
    }
    
})


router.post('/deleteUpdateMap',async function (req, res) {
    const {address,uri,tokenId,contractAddress}=req.body
    if(!address) return res.send(failedFormat('required address'))
    if(!uri) return res.send(failedFormat('required uri'))
    if(!tokenId) return res.send(failedFormat('required tokenId'))
    if(!contractAddress) return res.send(failedFormat('required contractAddress'))
    if(!chainId) return res.send(failedFormat('required chainId'))
    try {
        const contract=getContract(contractAddress,chainId)
        contract.callStatic.deleteTokenUpdate(address,uri,Number(tokenId)).then(async(success)=>{
            if(success){
                const tx=await contract.deleteTokenUpdate(address,uri,Number(tokenId))
                const txRes=await tx.wait()
                return res.send(msgFormat(txRes))
            }else{
                return res.send(failedFormat('failed to delete update map'))
            }
        }).catch(err=>res.send(failedFormat(err)))
    } catch (error) {
        res.send(failedFormat(error.message||error))
    }
    
})

module.exports = router