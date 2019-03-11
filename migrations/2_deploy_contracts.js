var ExampleToken = artifacts.require("./ExampleToken.sol");
var ExampleTokenCrowdsale = artifacts.require("./ExampleTokenCrowdsale.sol");

const ether = (n) => new web3.BigNumber(web3.toWei(n, 'ether'));

module.exports = async function(deployer , network , accounts) {
    // these variables are declared just to be able to properly migrate -- in truffle develop, 
    //ExampleToken.new, etc plugs in the actual params.
    const _name = "hi";
    const _symbol = "hi";
    const _decimal = 0;

    deployer.deploy(ExampleToken, _name, _symbol, _decimal)
    .then(() => ExampleToken.deployed())
    .then(token => deployer.deploy(ExampleTokenCrowdsale
                                    , 1
                                    , accounts[0]
                                    , token.address
                                    , ether(1)));
};