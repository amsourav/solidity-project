import web3 from './web3';
import Identity from './build/Identity.json';

const instance = new web3.eth.Contract(
  JSON.parse(Identity.interface),
  '0xb063b0ee5ef4006e1b50a118cc6cd3d9b41365ec',
);

// old contract 0x5dE163398d65E4142d10d9C88F3069aC3B221DC4
// old contract-1 0x6dA2C66dd3a04a1def52d61B8FF65832cfDddD99
export default instance;
