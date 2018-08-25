import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x8431ae0efd58bc8453c947196ab3338979a84275',
);

// old contract 0x5dE163398d65E4142d10d9C88F3069aC3B221DC4
// old contract-1 0x6dA2C66dd3a04a1def52d61B8FF65832cfDddD99
export default instance;
