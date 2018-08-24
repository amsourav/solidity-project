var Migrations = artifacts.require("./Campaign.sol");

// string cName, string cSubject, string cUrl, uint cMin, address cManager

module.exports = function(deployer) {
  deployer.deploy(Migrations, "Fund my coffee", "Fund my coffee from starnucks", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa-Yw2KJAeo0SERuS6H3z9v5O3jEaH6FsVD4-rTnUJezp4Tbdg", 1, "0x2DFb392EF2d8a1e9dff6ea13FCa84f47d6b565C6");
  deployer.deploy(Migrations, "Fund my macbook", "Fund my macbook for work", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Aerial_view_of_Apple_Park_dllu.jpg/260px-Aerial_view_of_Apple_Park_dllu.jpg", 1, "0x2DFb392EF2d8a1e9dff6ea13FCa84f47d6b565C6");
};
