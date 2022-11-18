/**
 * @Author: Jacky Chang
 * @Date: 2022-11-16 23:22:55
 * @LastEditors: Jacky Chang
 * @LastEditTime: 2022-11-18 15:48:20
 * @Description: 
 */
// wei转换bigNumber
export const tokens = (n) => {
    return new web3.utils.toBN(
        web3.utils.toWei(n.toString(), 'ether')
    )
}

export const EVM_REVERT = 'VM Exception while processing transaction: revert'