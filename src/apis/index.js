import factory from '../../ethereum/factory';
import CampaignContract from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

export const getDeployedContracts = async () => factory.methods.getDeployedCampaigns().call();

export const getCampaignSummary = async address => {
  console.log(address)
  const campaign = CampaignContract(address);
  const summary = await campaign.methods.getSummary().call();

  return {
    contractAddress: address,
    campaignOwner: summary[0],
    campaignTitle: summary[1],
    campaignSubject: summary[2],
    campaignImage: summary[3],
    campaignMinimum: parseInt(summary[4], 10),
  };
};

export const getAllContractsSummary = async () => {
  const allData = [];
  const allContractAddress = await getDeployedContracts();
  allContractAddress.forEach((address) => {
    allData.push(getCampaignSummary(address));
  });

  return Promise.all(allData);
};

export const getAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  if (!accounts) {
    throw new Error("Couldn't find any account");
  }
  return accounts[0];
};

export const createCampaign = async (props) => {
  const account = await getAccount();
  const campaignParams = {
    campaignName: props.title,
    campaignSubject: props.subject,
    campaignURL: props.image,
    minimum: parseInt(props.minContribution, 10),
  };
  // string campaignName, string campaignSubject, string campaignURL, uint minimum
  //   console.log("campaign params ==>", campaignParams);
  return factory.methods
    .createCampaign(
      campaignParams.campaignName,
      campaignParams.campaignSubject,
      campaignParams.campaignURL,
      campaignParams.minimum,
    )
    .send({
      from: account,
    })
    .on('error', (error) => {
      console.log(error);
    })
    .on('transactionHash', (transactionHash) => {
      console.log('1', transactionHash);
    })
    .on('receipt', (receipt) => {
      console.log('2', receipt); // contains the new contract address
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log('3', confirmationNumber, receipt);
    })
    .then((newContractInstance) => {
      console.log('4', newContractInstance);
      console.log('contract address ==>', newContractInstance.to); // instance with the new contract address
    })
    .catch((e) => {
      console.log(e);
    });
};
