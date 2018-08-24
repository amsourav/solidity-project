pragma solidity ^0.4.17;

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

contract Campaign {
    address public manager;
    string public campaignName;
    string public campaignSubject;
    string public campaignURL;
    uint public minimumContribution;

    // Guard function
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(string cName, string cSubject, string cUrl, uint cMin, address cManager) public {
        campaignName = cName;
        campaignSubject = cSubject;
        campaignURL = cUrl;
        minimumContribution = cMin;
        manager = cManager;
    }

}