# blockchain-hw-3
Ashley Huynh
CSC 4980 Assignment #3

### How to Run Programs:

## Prerequisites:
* ###### Make sure you are in the `blockchain-hw-3` directory.

* ###### Make sure you have Truffle version 4.1.15. To check, run `truffle version` and you should see the following:
`Truffle v4.1.15 (core: 4.1.15)
Solidity v0.4.25 (solc-js)`

* ###### If you don't, then run `npm install -g truffle@4.1.15`, which requires the npm package. In order to do this, you may need to install Node, which is available via homebrew on Mac. For more information please check out the following link: https://changelog.com/posts/install-node-js-with-homebrew-on-os-x 

## Instructions:
* Run `truffle compile`

* Run `truffle develop`, which should open up a shell.

* Once in the Truffle Develop session, run `migrate --reset`.

* Upon successful migration, you must now instantiate an instance of ExampleToken -- run `ExampleToken.new(_name, _symbol, _decimals).then((t) => {token = t;})`, where:
  * `_name` is the name of the token
  * `_symbol` is the symbol (ex: EXM or GSU)>
  * `_decimals` is the number of desired decimal places. 
This should return `undefined` in the console. (_Please note: it's very important to use *`.new()`* and not *`.deployed()`*, as it creates a NEW instance of the contract that doesn't have the arbitrary contract variables used in the `2_deploy_contracts.js` file._)

* You must now instantiate an instance of ExampleTokenCrowdsale -- run `ExampleTokenCrowdsale.new(_rate, _wallet, _token , _cap)).then((t) => {sale = t;})`, where:
  * `_rate` is the rate for how many tokens per ether 
  * `_wallet` is the specified wallet (ex: `web3.eth.accounts[0]`)
  * `_token` is the token referenced in `ExampleToken`'s address (`token.address` in this case)
  * `_cap` is the max number of ether available. This should return `undefined` in the console. (_Please note: it's very important to use *`.new()`* and not *`.deployed()`*, as it creates a NEW instance of the contract that doesn't have the arbitrary contract variables used in the `2_deploy_contracts.js` file._)

* Now, you must run `token.transferOwnership(sale.address)` to transfer ownership of `token contract` to `crowdsale contract` in order to mint tokens.

* After this, you're free to begin buying tokens, checking account balances, and seeing how many tokens remain after transactions.

###### To Buy Tokens:
* Run `sale.buyTokens(_account, {value : new web3.BigNumber(web3.toWei(_value, 'ether')) , from : _fromAccount});`, where:
  * `_account` is the account you're purchasing for (ex: `web3.eth.accounts[0]`)
  * `_value` is the number of tokens purchased
  * `_fromAccount` is the account the tokens are from.

###### To Check Balance of Account:
* Run `token.balanceOf(_account).then(result => result.toNumber())`, where:
  * `_account` is the account you're checking the balance of (ex: `web3.eth.accounts[0]`). 
(The `then()` function maps the result into a more readable format.)

###### To Check How Many Tokens are Left in Account (`getTokensLeft()`):
* Run `sale.getTokensLeft(_account).then(result => web3.fromWei(result.toNumber(), "ether" ))` (to get number of ether left from token => ether conversion) OR  `sale.getTokensLeft(_account).then(result => result.toNumber())` to get the explicit number of tokens left. 
  * In both scenarios, `_account` is the account you're checking the token remainder on (ex: `web3.eth.accounts[0]`).


### Solutions
###### Homework Example Results
* 
###### Tutorial Example Results
* 



