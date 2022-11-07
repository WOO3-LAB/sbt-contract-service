const {log}=require('../utils')
const axios = require('axios')
function verify(address,sourceCode,contractName){
    log('verify start')
    log(address,contractName)
    const data={
        apikey: process.env.POLYGONSCAN_KEY,                     //A valid API-Key is required        
        module: 'contract',                             //Do not change
        action: 'verifysourcecode',                     //Do not change
        contractaddress: address,   //Contract Address starts with 0x...     
        sourceCode: sourceCode,             //Contract Source Code (Flattened if necessary)
        codeformat: 'solidity-standard-json-input',             //solidity-single-file (default) or solidity-standard-json-input (for std-input-json-format support
        contractname: `${contractName}.sol:${contractName}`,         //ContractName (if codeformat=solidity-standard-json-input, then enter contractname as ex: erc20.sol:erc20)
        compilerversion: 'v0.8.17+commit.8df45f5f',   // see https://polygonscan.com/solcversions for list of support versions
        // optimizationUsed: 0, //0 = No Optimization, 1 = Optimization used (applicable when codeformat=solidity-single-file)
        // runs: 200,                                      //set to 200 as default unless otherwise  (applicable when codeformat=solidity-single-file)        
        constructorArguements: '',   //if applicable
        evmversion: '',             //leave blank for compiler default, homestead, tangerineWhistle, spuriousDragon, byzantium, constantinople, petersburg, istanbul (applicable when codeformat=solidity-single-file)
        licenseType: '3', 
    }
    return axios({
        method:'post',
        data:data,
        url:process.env.NETWORK,
        headers: {'content-type':'application/x-www-form-urlencoded'}
    })
    .then(res=>{
        log('verify res:',address,contractName,res.data)
        return res.data
    })
    .catch(err=>{
        log('verify err',err.message||err)
        return err
    })
}

function verifyStatus(guid){
    log('verifyStatus',guid)
    const data={
        apikey: process.env.POLYGONSCAN_KEY, 
        guid, //Replace with your Source Code GUID receipt above
        module: "contract",
        action: "checkverifystatus"
    }
    return axios({
        method:'get',
        data:data,
        url:process.env.NETWORK,
        headers: {'content-type':'application/x-www-form-urlencoded'}
    })
    .then(res=>{
        log('verifyStatus:',res.data)
        return res.data
    })
    .catch(err=>{
        log('verify err',err.message||err)
        return err
    })
}

module.exports={
    verify,
    verifyStatus
}