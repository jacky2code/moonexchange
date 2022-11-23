/**
 * @Author: GKing
 * @Date: 2022-11-22 18:54:29
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-22 21:45:54
 * @Description: 
 * @TODO: 
 */
const Token = artifacts.require('Token');

module.exports = async function(deployer) {
    await deployer.deploy(Token);
};