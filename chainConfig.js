const chains = {
    137: {
        PROVIDER_NETWORK: 'matic',
        POLYGONSCAN_KEY: 'xxxxxxxxxxxx',
        NETWORK: 'https://api.polygonscan.com/api',
        ALCHEMY_KEY: "xxxxxxxxxxxx"
    },
    80001: {
        PROVIDER_NETWORK: 'maticmum',
        POLYGONSCAN_KEY: 'xxxxxxxxxxxx',
        NETWORK: 'https://api-testnet.polygonscan.com/api',
        ALCHEMY_KEY: "xxxxxxxxxxxx"
    },
    210425: {
        PROVIDER_NETWORK: 'platOn',
        RPC_NETWORK: 'https://openapi.platon.network/rpc',
        NETWORK: 'https://api.plateye.com/api/v2/contract/submitContract'
    },
    2206132: {
        PROVIDER_NETWORK: 'platOn',
        RPC_NETWORK: 'https://devnet2openapi.platon.network/rpc',
        NETWORK: 'https://api.plateye.com/platon-api'
    },
    23294: {
        PROVIDER_NETWORK: 'Oasis Sapphire',
        RPC_NETWORK: 'https://sapphire.oasis.io',
        NETWORK: 'https://sapphire.oasis.io/api'
    },
    23295: {
        PROVIDER_NETWORK: 'Oasis Sapphire Testnet',
        RPC_NETWORK: 'https://testnet.sapphire.oasis.dev',
        NETWORK: 'https://testnet.sapphire.oasis.dev/api'
    },
}

module.exports = chains