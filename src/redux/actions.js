/**
 * @Author: GKing
 * @Date: 2022-11-25 09:45:30
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-25 20:25:00
 * @Description: 
 * @TODO: 
 */
export function web3Loaded(connection) {
    return {
        type: 'WEB3_LOADED',
        connection: connection
    }
}

export function web3AccountLoaded(account) {
    return {
        type: 'WEB3_ACCOUNT_LOADED',
        account: account
    }
}

export function tokenLoaded(contract) {
    return {
        type: 'TOKEN_LOADED',
        contract: contract
    }
}

export function exchangeLoaded(contract) {
    return {
        type: 'EXCHANGE_LOADED',
        contract: contract
    }
}