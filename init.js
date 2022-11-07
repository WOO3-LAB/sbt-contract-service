const path = require("path");
const fs = require("fs");
const {compile}=require('./scripts/compile');


function init(){
    const {abi,bytecode}=compile('wooo')
    const data=JSON.stringify({abi,bytecode},"","\t")
    const template=`const json = ${data}\rmodule.exports=json`
    fs.writeFile(path.join(__dirname,"./compiled/v1.js"),template,(err)=>{
        if(err) throw err
        console.log('json has been create')
        process.exit()
    })
}

init()


