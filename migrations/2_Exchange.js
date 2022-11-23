/**
 * @Author: GKing
 * @Date: 2022-11-22 21:14:50
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-22 21:45:49
 * @Description: 
 * @TODO: 
 */
const Exchange = artifacts.require('Exchange');

module.exports = async function(deployer) {
    const accounts = await web3.eth.getAccounts();
    const feeAccount = accounts[0];
    const feePercent = 10;
    await deployer.deploy(Exchange, feeAccount, feePercent);
};