const chains={
    137:{
        PROVIDER_NETWORK:'matic',
        POLYGONSCAN_KEY:'xxxxxxxxxxxx', //POLYGONSCAN_KEY
        NETWORK:'https://api.polygonscan.com/api',
        ALCHEMY_KEY:"xxxxxxxxxx" //ALCHEMY_KEY
    },
    80001:{
        PROVIDER_NETWORK:'maticmum',
        POLYGONSCAN_KEY:'xxxxxxxxxx', //POLYGONSCAN_KEY
        NETWORK:'https://api-testnet.polygonscan.com/api',
        ALCHEMY_KEY:"xxxxxxxxxxx" //ALCHEMY_KEY
    },
    210425:{
        PROVIDER_NETWORK:'platOn',
        RPC_NETWORK:'https://openapi.platon.network/rpc',
        NETWORK:'https://api.plateye.com/api/v2/contract/submitContract'
    },
    2206132:{
        PROVIDER_NETWORK:'platOn',
        RPC_NETWORK:'https://devnet2openapi.platon.network/rpc',
        NETWORK:'https://api.plateye.com/platon-api'
    }
}

module.exports=chains