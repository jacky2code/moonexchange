/**
 * Author: GKing
 * Date: 2022-11-15 22:19:58
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-21 17:04:45
 * Description: 
 */
export const EVM_REVERT = 'VM Exception while processing transaction: revert'

export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'


// wei转换bigNumber
export const ethers = (n) => {
    return new web3.utils.toBN(
        web3.utils.toWei(n.toString(), 'ether')
    )
}

export const tokens = (n) => ethers(n)