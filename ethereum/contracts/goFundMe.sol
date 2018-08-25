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
    
    function find(address value) returns(uint) {
        uint i = 0;
        while (deployedCampaigns[i] != value) {
            i++;
        }
        return i;
    }

    function removeByValue(address value) {
        uint i = find(value);
        removeByIndex(i);
    }

    function removeByIndex(uint i) {
        while (i<deployedCampaigns.length-1) {
            deployedCampaigns[i] = deployedCampaigns[i+1];
            i++;
        }
        deployedCampaigns.length--;
    }
    
    
    function removeDeployedCampaigns(address campaignAddress) public {
        removeByValue(campaignAddress);
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;

    mapping(address => bool) public approvers;
    uint public approversCount;

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

    constructor(string cName, string cSubject, string cUrl, uint cMin, address cManager) public {
        campaignName = cName;
        campaignSubject = cSubject;
        campaignURL = cUrl;
        minimumContribution = cMin;
        manager = cManager;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        address, string, string, string, uint, uint
    ) {
        return (manager, campaignName, campaignSubject, campaignURL, minimumContribution, address(this).balance);
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

}