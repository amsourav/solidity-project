const HDWalletProvider = require('truffle-hdwallet-provider');

const rinkeby = 'foster around protect expand remain roof night month puzzle choice brain roof'
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(rinkeby, "https://rinkeby.infura.io/v3/65e937e10ddd40cd8aaea30ce1fc806c");
      },
      network_id: "*"
    },
  }
};
