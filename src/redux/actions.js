/**
 * @Author: GKing
 * @Date: 2022-11-25 09:45:30
 * @LastEditors: GKing
 * @LastEditTime: 2022-12-01 10:04:54
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

export function orderFilling() {
    return {
        type: 'ORDER_FILLING'
    }
}

export function orderFilled(order) {
    return {
        type: 'ORDER_FILLED',
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

// 获取输入框输入的 存入 ETH 数量
export function ethDepositedAmountChanged(amount) {
    return {
        type: 'ETHDEPOSITED_AMOUNTCHANGED',
        ethAmountDeposited: amount
    }
}

// 获取输入框输入的 提取 ETH 数量
export function ethWithdrawedAmountChanged(amount) {
    return {
        type: 'ETHWITHDRAWED_AMOUNTCHANGED',
        ethAmountWithdrawed: amount
    }
}

// 获取输入框输入的 存入 token 数量
export function tokenDepositedAmountChanged(amount) {
    return {
        type: 'TOKENDEPOSITED_AMOUNTCHANGED',
        tokenAmountDeposited: amount
    }
}

// 获取输入框输入的 提取 token 数量
export function tokenWithdrawedAmountChanged(amount) {
    return {
        type: 'TOKENWITHDRAWED_AMOUNTCHANGED',
        tokenAmountWithdrawed: amount
    }
}

// 获取输入框输入的购买 数量
export function buyOrderAmountChanged(amount) {
    return {
        type: 'BUY_ORDER_AMOUNT_CHANGED',
        buyOrderAmount: amount
    }
}

// 获取输入框输入的购买 价格
export function buyOrderPriceChanged(price) {
    return {
        type: 'BUY_ORDER_PRICE_CHANGED',
        buyOrderPrice: price
    }
}

export function buyOrderCreating() {
    return {
        type: 'BUY_ORDER_CREATING'
    }
}

// 获取输入框输入的卖出 数量
export function sellOrderAmountChanged(amount) {
    return {
        type: 'SELL_ORDER_AMOUNT_CHANGED',
        sellOrderAmount: amount
    }
}

// 获取输入框输入的卖出 价格
export function sellOrderPriceChanged(price) {
    return {
        type: 'SELL_ORDER_PRICE_CHANGED',
        sellOrderPrice: price
    }
}

export function sellOrderCreating() {
    return {
        type: 'SELL_ORDER_CREATING'
    }
}

export function orderCreated(order) {
    return {
        type: 'ORDER_CREATED',
        order: order
    }
}