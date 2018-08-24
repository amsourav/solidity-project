pragma solidity ^0.4.17;

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

    constructor(string cName, string cSubject, string cUrl, uint cMin, address cManager) public {
        campaignName = cName;
        campaignSubject = cSubject;
        campaignURL = cUrl;
        minimumContribution = cMin;
        manager = cManager;
    }
}