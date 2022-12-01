const {ethers } = require("ethers");
const v1=require('../compiled/v1')
const chainList=require('../chainConfig')

function getProvider(chainId){
    const {PROVIDER_NETWORK,ALCHEMY_KEY,RPC_NETWORK}=chainList[chainId]
    if(ALCHEMY_KEY){
        return new ethers.providers.AlchemyProvider(PROVIDER_NETWORK,ALCHEMY_KEY)
    }else{
        return new ethers.providers.JsonRpcProvider(RPC_NETWORK,{name:PROVIDER_NETWORK,chainId:Number(chainId)})
    }
    
}

function getSinger(chainId){
    return new ethers.Wallet(process.env.WALLET_KEY,getProvider(chainId))
}

function getContract(address,chainId){
    const {abi}=v1
    const singer=getSinger(chainId)
    return new ethers.Contract(address,abi,singer)
}

function msgFormat(data){
    return {
        code:200,
        data,
        msg:'success'
    }
}

function failedFormat(msg,code=500){
    return {
        code,
        data:'',
        msg
    }
}

function log(...msg){
    const date=new Date()
    let fullYear = date.getFullYear();    
    let month = date.getMonth() + 1;    
    let _date = date.getDate();    
    let hours = date.getHours();    
    let minutes = date.getMinutes();  
    let seconds = date.getSeconds();  
    if(month < 10){month = '0'+month}    
    if(_date < 10){_date = '0'+_date}  
    if(hours < 10){hours = '0'+hours}    
    if(minutes < 10){minutes = '0'+minutes}  
    if(seconds < 10){seconds = '0'+seconds}    
    const str=fullYear + '-' + month + '-' + _date + ' ' + hours + ':' + minutes + ':' + seconds
    console.log(str+' '+msg.map(item=>typeof item==='object'?JSON.stringify(item):item).join(' '))
}

module.exports={
    getProvider,
    getSinger,
    getContract,
    msgFormat,
    failedFormat,
    log
}