var Migrations = artifacts.require("./CampaignFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
