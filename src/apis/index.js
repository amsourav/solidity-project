import factory from '../../ethereum/factory';
import CampaignContract from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import identity from '../../ethereum/indentity';

export const getDeployedContracts = async () => factory.methods.getDeployedCampaigns().call();

export const getAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  if (!accounts) {
    throw new Error("Couldn't find any account");
  }
  return accounts[0];
};

export const getCampaignSummary = async (address) => {
  // console.log(address);
  const campaign = CampaignContract(address);
  const summary = await campaign.methods.getSummary().call();

  console.log('campaign raw ==>', summary);

  return {
    contractAddress: address,
    campaignOwner: summary[0],
    campaignTitle: summary[1],
    campaignSubject: summary[2],
    campaignImage: summary[3],
    campaignMinimum: web3.utils.fromWei(summary[4], 'ether'),
    campaignBalance: web3.utils.fromWei(summary[5], 'ether'),
  };
};

export const contributeToCampaign = async (address, value) => {
  // console.log(address, value);
  const account = await getAccount();
  const campaign = CampaignContract(address);
  const contribution = await campaign.methods
    .contribute()
    .send({
      from: account,
      value: web3.utils.toWei(value, 'ether'),
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
  return contribution;
};

export const getAllContractsSummary = async () => {
  const allData = [];
  const allContractAddress = await getDeployedContracts();
  allContractAddress.forEach((address) => {
    allData.push(getCampaignSummary(address));
  });

  return Promise.all(allData);
};

export const userIsMember = async (address) => {
  const account = await getAccount();
  const campaign = CampaignContract(address);
  const isMember = await campaign.methods.approvers(account).call();

  return isMember;
};

export const createCampaign = async (props) => {
  const account = await getAccount();
  const campaignParams = {
    campaignName: props.title,
    campaignSubject: props.subject,
    campaignURL: props.image,
    minimum: web3.utils.toWei(props.minContribution, 'ether'),
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

export const getPendingRequestCount = async (contractAddress) => {
  const campaign = CampaignContract(contractAddress);
  return campaign.methods.getRequestsCount().call();
};

export const getRequests = async (contractAddress, requestCount) => {
  const campaign = CampaignContract(contractAddress);
  return Promise.all(
    Array(parseInt(requestCount, 10))
      .fill()
      .map((element, index) => campaign.methods.requests(index).call())
      .map(async (r) => {
        const request = await r;
        console.log('hello ==>', request);
        return {
          approvalCount: request.approvalCount,
          complete: request.complete,
          description: request.description,
          recipient: request.recipient,
          value: web3.utils.fromWei(request.value, 'ether'),
        };
      }),
  );
};

export const createRequest = async (contractAddress, requestParams) => {
  // description, uint value, address recipient
  const account = await getAccount();
  const { description, value, recipient } = requestParams;
  const campaign = CampaignContract(contractAddress);
  try {
    const request = campaign.methods
      .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
      .send({
        from: account,
      });
    return request;
  } catch (e) {
    console.log(e);
  }
};

export const memberCount = async (contractAddress) => {
  const campaign = CampaignContract(contractAddress);
  return campaign.methods.approversCount().call();
};

export const getUsersCount = async () => identity.methods.getUsersCount().call();

export const getAllVerifiedUsers = async () => {
  const usersCount = await getUsersCount();

  return Promise.all(
    Array(parseInt(usersCount, 10))
      .fill()
      .map((element, index) => identity.methods.users(index).call())
      .map(async (r) => {
        const request = await r;
        // console.log('identity  ==>', request);
        return {
          username: request.username,
          socialProfile: request.socialProfile,
          identityDocument: request.identityDocument,
          publicBlockchainAddress: request.publicBlockchainAddress,
        };
      }),
  );
};

export const approveRequest = async (campaignAddress, requestId) => {
  const account = await getAccount();
  const campaign = CampaignContract(campaignAddress);
  // console.log(campaign)
  return campaign.methods
    .approveRequest(requestId)
    .send({
      from: account,
    });
};

export const completeRequest = async (campaignAddress, requestId) => {
  const account = await getAccount();
  const campaign = CampaignContract(campaignAddress);
  return campaign.methods
    .finalizeRequest(requestId)
    .send({
      from: account,
    });
};
