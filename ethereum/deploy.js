const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const rinkebyToken = 'foster around protect expand remain roof night month puzzle choice brain roof'

const provider = new HDWalletProvider(
  rinkebyToken,
  'https://rinkeby.infura.io/v3/65e937e10ddd40cd8aaea30ce1fc806c'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  if (!accounts) {
      console.error('Failed to get any accounts, Exiting...');
      return
  }

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '6721975', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
