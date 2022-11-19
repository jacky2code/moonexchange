/**
 * Author: GKing
 * Date: 2022-11-15 22:19:58
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-19 08:46:27
 * Description: 
 */
// wei转换bigNumber
export const tokens = (n) => {
    return new web3.utils.toBN(
        web3.utils.toWei(n.toString(), 'ether')
    )
}

export const EVM_REVERT = 'VM Exception while processing transaction: revert'