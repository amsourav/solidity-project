pragma solidity ^0.4.17;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(string campaignName, string campaignSubject, string campaignURL, uint minimum) public {
        address newCampaign = new Campaign(campaignName, campaignSubject, campaignURL, minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}