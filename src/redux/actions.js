/**
 * @Author: GKing
 * @Date: 2022-11-25 09:45:30
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-29 22:12:08
 * @Description: 在 interactions.js 通过 dispatch 调用 actions.js 中的函数，
 *  如：dispatch(web3AccountLoaded(account))
 * @TODO: 定义 action 给 reducer 使用
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

export function cancelledOrdersLoaded(cancelledOrders) {
    return {
        type: 'CANCELLED_ORDERS_LOADED',
        cancelledOrders: cancelledOrders
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

export function orderCancelling() {
    return {
        type: 'ORDER_CANCELLING'
    }
}

export function orderCancelled(order) {
    return {
        type: 'ORDER_CANCELLED',
        order: order
    }
}

export function ethBalanceLoaded(ethBalance) {
    return {
        type: 'ETH_BALANCE_LOADED',
        ethBalance: ethBalance
    }
}
export function tokenBalanceLoaded(tokenBalance) {
    return {
        type: 'TOKEN_BALANCE_LOADED',
        tokenBalance: tokenBalance
    }
}

export function ethBalanceInExchLoaded(ethBalanceInExch) {
    return {
        type: 'ETH_BALANCE_IN_EXCH_LOADED',
        ethBalanceInExch: ethBalanceInExch
    }
}

export function tokenBalanceInExchLoaded(tokenBalanceInExch) {
    return {
        type: 'TOKEN_BALANCE_IN_EXCH_LOADED',
        tokenBalanceInExch: tokenBalanceInExch
    }
}

export function allBalancesLoaded() {
    return {
        type: 'ALL_BALANCES_LOADED',
    }
}

export function balancesLoading() {
    return {
        type: 'ALL_BALANCES_LOADING',
    }
}