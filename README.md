## Introduction
SBTContractService is an SBT contract service developed by **Node.js**, including deployment, validation, and contract-exposed methods, all based on [alchemy](https://www.alchemy.com/) and [polygonscan](https://polygonscan.com/)

There is a contract template under the `contracts` directory, and SBT is created based on the contract template

## PM2 config

```
module.exports = {
  apps : [{
    name:'woo3-contract',
    script: 'index.js',
    watch: false,
    exec_mode:"cluster",
    instances:1,
    env:{
      NODE_ENV: "production",
      WALLET_KEY:"0xxxxxx.", // wallet private key 
      ALCHEMY_KEY:"xxxxxxxx", // alchemy key
      NETWORK:'https://api-testnet.polygonscan.com/api',
      PROVIDER_NERWORK:'maticmum',
      POLYGONSCAN_KEY:"3T7HDTHTRDU7TEJ7M5Y4VUXF4NGIV1MVSG" // polygonscan key
    },
    error_file:'error.log',
    out_file:'out.log',
  }],
};
```

## Installation and Deploy
```
1. Install `Node.js and PM2`
2. Install Dependency `yarn install`
3. Start Service `yarn start`
```

## Contribution

Any comments or suggestions are welcome to raise issues, or directly to [@WOO3-LAB](https://github.com/WOO3-LAB)

## License

MIT
