pragma solidity ^0.4.17;

contract Identity {

    address[] public verfiedAddress;

    struct User {
        string username;
        string socialProfile;
        string identityDocument;
        address publicBlockchainAddress;
    }

    User[] public users;
    uint public usersCount;
    mapping(address => bool) public uniqueUsers;

    function addUser(string _username, string _socialProfile, string _identityDocument, address _publicBlockchainAddress) public {
        User memory newUser = User({
           username: _username,
           socialProfile: _socialProfile,
           identityDocument: _identityDocument,
           publicBlockchainAddress: _publicBlockchainAddress
        });
        uniqueUsers[_publicBlockchainAddress] = true;
        users.push(newUser);
    }

    function getUsersCount() public view returns (uint) {
        return users.length;
    }
}