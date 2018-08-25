import factory from "../../ethereum/factory";
import CampaignContract from "../../ethereum/campaign";

export const getDeployedContracts = async () => {
  return await factory.methods.getDeployedCampaigns().call();
};

export const getAllContractsSummary = async () => {
  const allData = [];
  const allContractAddress = await getDeployedContracts();
  allContractAddress.forEach(address => {
    allData.push(getCampaignSummary(address));
  });

  return Promise.all(allData);
};

export const getCampaignSummary = async address => {
  const campaign = CampaignContract(address);
  const summary = await campaign.methods.getSummary().call();

  return {
    contractAddress: address,
    campaignOwner: summary[0],
    campaignTitle: summary[1],
    campaignSubject: summary[2],
    campaignImage: summary[3],
    campaignMinimum: parseInt(summary[4], 10)
  };
};
