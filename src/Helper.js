/**
 * @Author: GKing
 * @Date: 2022-11-27 13:30:16
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-28 15:40:19
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

export const WHITE_CANDLE = '#E5F0FF'
export const GREEN_CANDLE = '#00B38B'
export const RED_CANDLE = '#B01010'