/**
 * @Author: GKing
 * @Date: 2022-11-25 09:45:30
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-27 15:01:10
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

export function canceledOrdersLoaded(canceledOrders) {
    return {
        type: 'CANCELED_ORDERS_LOADED',
        canceledOrders: canceledOrders
    }
}

export function filledOrdersLoaded(filledOrders) {
    return {
        type: 'FILLED_ORDERS_LOADED',
        filledOrders: filledOrders
    }
}

export function allOrdersLoaded(allOrders) {
    return {
        type: 'ALL_ORDERS_LOADED',
        allOrders: allOrders
    }
}