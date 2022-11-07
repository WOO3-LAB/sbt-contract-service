const {ethers } = require("ethers");
const { parseUnits ,formatUnits} = require("ethers/lib/utils");
const {getSinger,log,getProvider}=require("../utils")

async function deploy(abi,bytecode){
    const signer=getSinger()
    const provider=getProvider()
    const price_unit = "gwei";
    const price = formatUnits(await provider.getGasPrice(), price_unit);
    // console.log(abi);
    // console.log(bytecode);
    // console.log("-----------------------------------------------");
    log(price)
    const factory = new ethers.ContractFactory(abi, bytecode, signer)
    const contract = await factory.deploy({
        gasLimit: 5000000,
        gasPrice: parseUnits(price, price_unit),
    });
    await contract.deployTransaction.wait()
    return contract.address
}

module.exports={
    deploy
}
