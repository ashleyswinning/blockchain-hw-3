# blockchain-hw-3
Ashley Huynh
CSC 4980 Assignment #3

# How to Run Programs:

## Prerequisites:
* ###### Make sure you are in the `blockchain-hw-3` directory.

* ###### Make sure you have Truffle version 4.1.15. I had some difficulty with more recent version being incompatible with older versions of `openzepplin-solidity` and this was my workaround. To check, run `truffle version` and you should see the following:

 > `Truffle v4.1.15 (core: 4.1.15)`

 > `Solidity v0.4.25 (solc-js)`

* ###### If you don't, then run `npm install -g truffle@4.1.15`, which requires the npm package. In order to do this, you may need to install Node, which is available via homebrew on Mac. For more information please check out the following link: https://changelog.com/posts/install-node-js-with-homebrew-on-os-x 

## Instructions:
* Run `truffle compile`

* Run `truffle develop`, which should open up a shell.

* Once in the Truffle Develop session, run `migrate --reset`.

* Upon successful migration, you must now instantiate an instance of ExampleToken -- run `ExampleToken.new(_name, _symbol, _decimals).then((t) => {token = t;})`, where:
  * `_name` is the name of the token
  * `_symbol` is the symbol (ex: EXM or GSU)
  * `_decimals` is the number of desired decimal places. 
  
This should return `undefined` in the console. 

**Please note: it's very important to use *`.new()`* and not *`.deployed()`*, as it creates a NEW instance of the contract that doesn't have the arbitrary contract variables used in the `2_deploy_contracts.js` file.**

* You must now instantiate an instance of ExampleTokenCrowdsale -- run `ExampleTokenCrowdsale.new(_rate, _wallet, _token , _cap)).then((t) => {sale = t;})`, where:
  * `_rate` is the rate for how many tokens per ether 
  * `_wallet` is the specified wallet (ex: `web3.eth.accounts[0]`)
  * `_token` is the token referenced in `ExampleToken`'s address (`token.address` in this case)
  * `_cap` is the max number of ether available. 
  
  This should return `undefined` in the console. 
  
**Please note: it's very important to use *`.new()`* and not *`.deployed()`*, as it creates a NEW instance of the contract that doesn't have the arbitrary contract variables used in the `2_deploy_contracts.js` file.**

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
* Run `sale.getTokensLeft().then(result => web3.fromWei(result.toNumber(), "ether" ))` (to get number of ether left in the crowdsale from token => ether conversion) OR  `sale.getTokensLeft().then(result => result.toNumber())` to get the explicit number of tokens left in the crowdsale


# Solutions
## Tutorial Testing Transaction Results
**Preliminary steps:**
* run `truffle compile`
* run `truffle develop`
* run `migrate --reset`
* run `ExampleToken.new("Example Token", "EXM", 18).then((t) => {token = t;})`
* run `ExampleTokenCrowdsale.new(500, web3.eth.accounts[0], token.address , new web3.BigNumber(web3.toWei(200, 'ether'))).then((t) => {sale = t;})`
* run `token.transferOwnership(sale.address)`

> Run `sale.buyTokens(web3.eth.accounts[1], {value : new web3.BigNumber(web3.toWei(1, 'ether')) , from : web3.eth.accounts[1]});`
* Upon running this, it failed. This is because the contribution cap in the tutorial is 2 ether.

> Run `sale.buyTokens(web3.eth.accounts[1], {value : new web3.BigNumber(web3.toWei(2, 'ether')) , from : web3.eth.accounts[1]});`
* Upon running this, it succeeded. This is because the contribution cap in the tutorial is 2 ether.

> Run `sale.buyTokens(web3.eth.accounts[1], {value : new web3.BigNumber(web3.toWei(48, 'ether')) , from : web3.eth.accounts[1]});`
* Upon running this, it succeeded. This is because the contribution cap in the tutorial is 2 ether and 48 > 2.

> Run `sale.buyTokens(web3.eth.accounts[1], {value : new web3.BigNumber(web3.toWei(1, 'ether')) , from : web3.eth.accounts[1]});`
* Upon running this, it failed. This is because the maximum investor cap `investorHardCap` is 50 ether and we purchased 2 and 48 ether for `web3.eth.accounts[1]`, which has reached the max.

> Run `token.balanceOf(web3.eth.accounts[1]).then(result => result.toNumber())`
* Upon running this, it returned `2.5e+22`.

## Tutorial (Tweaked for the Homework) Results
**Preliminary steps:**
* run `truffle compile`
* run `truffle develop`
* run `migrate --reset`
* run `ExampleToken.new("Example Token", "EXM", 18).then((t) => {token = t;})`
* run `ExampleTokenCrowdsale.new(500, web3.eth.accounts[0], token.address , new web3.BigNumber(web3.toWei(200, 'ether'))).then((t) => {sale = t;})`
* run `token.transferOwnership(sale.address)`

**Change minimum contribution to 5 ether:**
* To do this, changed `investorMinCap` variable in `ExampleTokenCrowdsale.sol` from `2000000000000000000` (2 ether) to `5000000000000000000` (5 ether).

* To test, try to do a sale `sale.buyTokens(web3.eth.accounts[1], {value : new web3.BigNumber(web3.toWei(1, 'ether')) , from : web3.eth.accounts[1]});`, where the purchase amount is 5 ether. It should fail, as the new minimum is 5.

**Add method `getTokensLeft()`:**
* To do this, added into `ExampleTokenCrowdsale.sol` a function: ` getTokensLeft()()` that checks the remaining number of tokens left in the crowdsale based on the specified cap. It is a constant public function (constant so it can properly return a value) that returns a uint256 variable, the number of tokens left.

* To test, run `sale.getTokensLeft().then(result => result.toNumber())` . Then, run it again after running a valid transaction like `sale.buyTokens(web3.eth.accounts[0], {value : new web3.BigNumber(web3.toWei(10, 'ether')) , from : web3.eth.accounts[1]});` and notice the difference between the value it returns before and after a sale happens. Further, you can test between different account transactions by running a valid transaction on another account like `sale.buyTokens(web3.eth.accounts[0], {value : new web3.BigNumber(web3.toWei(10, 'ether')) , from : web3.eth.accounts[1]});` -- it should subtract from the previous value to continuously decrease the # of tokens left in this crowdsale.

**Added needed functionality to not allow > 1 purchase per account:**
* To do this, added another require statement `require (_existingContribution == 0, "error: there has already been a purchase from this account.");` in the `_preValidatePurchase` function in `ExampleTokenCrowdsale.sol` that checks if the `_existingContribution` of a certain account is > 0. 

* If it is (meaning there has been a contribution made for this account), then an error is thrown and a custom error message, `"error: there has already been a purchase from this account."` is printed.

* To test, run a valid transaction like `sale.buyTokens(web3.eth.accounts[0], {value : new web3.BigNumber(web3.toWei(10, 'ether')) , from : web3.eth.accounts[1]});` and then try to run another valid transaction like running a transaction like `sale.buyTokens(web3.eth.accounts[0], {value : new web3.BigNumber(web3.toWei(5, 'ether')) , from : web3.eth.accounts[1]});`. 

* The first transaction should run successfully, the second transaction should return an error.

## Homework Example Results
**Preliminary steps:**
* run `truffle compile`
* run `truffle develop`
* run `migrate --reset`
* run `ExampleToken.new("CSC4980 Token", "GSU", 18).then((t) => {token = t;})`
* run `ExampleTokenCrowdsale.new(450, web3.eth.accounts[0], token.address , new web3.BigNumber(web3.toWei(150, 'ether'))).then((t) => {sale = t;})`
* run `token.transferOwnership(sale.address)`

**1. Try to buy tokens with 2.5 ether:** 
* Run `sale.buyTokens(web3.eth.accounts[0], {value : new web3.BigNumber(web3.toWei(2.5, 'ether')) , from : web3.eth.accounts[1]});`.

* An error is returned.

**2. Buy tokens with 15 ether:** 
* Run `sale.buyTokens(web3.eth.accounts[0], {value : new web3.BigNumber(web3.toWei(15, 'ether')) , from : web3.eth.accounts[1]});`.

* `web3.eth.accounts[0]` has now spent 15 ether. The transaction is successful.

**3. Return how many tokens are left:** 
* Run `sale.getTokensLeft().then(result => result.toNumber())` to see how many tokens remain in the crowdsale. (or `sale.getTokensLeft().then(result => web3.fromWei(result.toNumber(), "ether" ))` if it's easier to see the ether conversion of it)

**4. Buy tokens (again) with 25 Ether:** 
* Run `sale.buyTokens(web3.eth.accounts[0], {value : new web3.BigNumber(web3.toWei(25, 'ether')) , from : web3.eth.accounts[1]});`.

* This should return an error `error: there has already been a purchase from this account.` and be unsuccessful -- `web3.eth.accounts[0]` has already invested in a transaction. 
