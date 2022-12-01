const {log}=require('../utils')
const axios = require('axios')
const chainList=require('../chainConfig')

function verify(address,sourceCode,contractName,chainId){
    log('verify start')
    log(address,contractName,chainId)
    const {NETWORK,PROVIDER_NETWORK,POLYGONSCAN_KEY}=chainList[chainId]
    let data={}
    let headers={}
    if(PROVIDER_NETWORK==='platOn'){
        headers={'content-type':'application/json'}
        data={
            solcVersion: "v0.8.17+commit.8df45f5f",
            optimize: true,
            optimizeRuns: 0,
            contractAddress: address,
            sourceCode: sourceCode
        }
    }else{
        headers={'content-type':'application/x-www-form-urlencoded'}
        data={
            apikey: POLYGONSCAN_KEY,                     //A valid API-Key is required        
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
    }
    
    return axios({
        method:'post',
        data:data,
        url:NETWORK,
        headers
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

function verifyStatus(guid,chainId){
    log('verifyStatus',guid)
    const {NETWORK,POLYGONSCAN_KEY}=chainList[chainId]
    const data={
        apikey: POLYGONSCAN_KEY, 
        guid, //Replace with your Source Code GUID receipt above
        module: "contract",
        action: "checkverifystatus"
    }
    return axios({
        method:'get',
        data:data,
        url:NETWORK,
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