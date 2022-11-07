const fs = require("fs");
const solc = require("solc");
const path = require("path");
const fileName="WooTemplate.sol"

function findImports(importPath) {
    const contents=fs.readFileSync(path.resolve(__dirname,'../node_modules/',importPath),"utf-8")
    if (contents){
        return {
            contents
        };
    }
    else return { error: 'File not found' };
}

function compile(name="WooTemplate",outJSON=false){
    name+='SBT'
    const contractPath = path.resolve(__dirname,"../contracts",fileName);
    const contractSource = fs.readFileSync(contractPath,"utf-8");
    let jsonContractSource = JSON.stringify({
        language: 'Solidity',
        sources: {
            [name]: {  
                content: contractSource, 
            },
        },
        settings: { 
            outputSelection: {
                '*': {
                    '*': [ '*' ]
                }
            }
        },
    });
    jsonContractSource=jsonContractSource.replace(/WooTemplate/g,name)
    const result = JSON.parse(solc.compile(jsonContractSource,{ import: findImports }));
    return {
        abi:result.contracts[name][name].abi,
        bytecode:result.contracts[name][name].evm.bytecode.object,
        contractName:name
    }
}

module.exports={
    compile
}