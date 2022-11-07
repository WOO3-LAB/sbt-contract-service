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
