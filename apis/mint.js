var express = require('express')
var router = express.Router()
const { parseUnits ,formatUnits} = require("ethers/lib/utils");
const {getContract,msgFormat,failedFormat,getProvider}=require('../utils')

router.post('/',async function (req, res) {
    const {address,uri,contractAddress}=req.body
    if(!address) return res.send(failedFormat('required address'))
    if(!uri) return res.send(failedFormat('required uri'))
    if(!contractAddress) return res.send(failedFormat('required contractAddress'))
    try {
        const contract=getContract(contractAddress)
        const provider=getProvider()
        const price_unit = "gwei";
        const price = formatUnits(await provider.getGasPrice(), price_unit);
        contract.callStatic.safeMint(address,uri).then(async(success)=>{
            if(success){
                const tx=await contract.safeMint(address,uri,{
                    gasLimit: 3000000,
                    gasPrice: parseUnits(price, price_unit),
                })
                const txRes=await tx.wait()
                return res.send(msgFormat(txRes))
            }else{
                return res.send(failedFormat('failed to mint address'))
            }
        }).catch(err=>res.send(failedFormat(err)))
    } catch (error) {
        res.send(failedFormat(error.message||error))
    }
    
})


router.post('/setMintMap',async function (req, res) {
    const {data,contractAddress}=req.body
    if(!data) return res.send(failedFormat('required data'))
    if(!contractAddress) return res.send(failedFormat('required contractAddress'))
    const addresses=data.map(i=>i.address)
    const uris=data.map(i=>i.uri)
    try {
        const contract=getContract(contractAddress)
        contract.callStatic.setTokenMintMap(addresses,uris).then(async(success)=>{
            if(success){
                const tx=await contract.setTokenMintMap(addresses,uris)
                const txRes=await tx.wait()
                return res.send(msgFormat(txRes))
            }else{
                return res.send(failedFormat('failed to set mint map'))
            }
        }).catch(err=>res.send(failedFormat(err)))
    } catch (error) {
        res.send(failedFormat(error.message||error))
    }
    
})

router.post('/deleteMintMap',async function (req, res) {
    const {address,uri,contractAddress}=req.body
    if(!address) return res.send(failedFormat('required address'))
    if(!uri) return res.send(failedFormat('required uri'))
    if(!contractAddress) return res.send(failedFormat('required contractAddress'))
    try {
        const contract=getContract(contractAddress)
        contract.callStatic.deleteTokenMint(address,uri).then(async(success)=>{
            if(success){
                const tx=await contract.deleteTokenMint(address,uri)
                const txRes=await tx.wait()
                return res.send(msgFormat(txRes))
            }else{
                return res.send(failedFormat('failed to delete mint map'))
            }
        }).catch(err=>res.send(failedFormat(err)))
    } catch (error) {
        res.send(failedFormat(error.message||error))
    }
    
})

module.exports = router