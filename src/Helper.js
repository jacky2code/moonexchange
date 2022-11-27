/**
 * @Author: GKing
 * @Date: 2022-11-27 13:30:16
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-27 15:19:52
 * @Description: 
 * @TODO: 
 */
export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'
export const GREEN = 'success'
export const RED = 'danger'

export const DECIMALS = (10 ** 18)

// wei转换bigNumber
export const ethers = (wei) => {
    if(wei)
    {
        return (wei / DECIMALS)
    }
}

export const tokens = ethers