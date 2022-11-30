/**
 * @Author: GKing
 * @Date: 2022-11-25 20:54:03
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-30 11:34:58
 * @Description: 
 *  选择器函数接收整个 state 对象，并且返回需要的部分数据
 *  每当 Redux store 更新时，选择器将重新运行，如果它们返回的数据发生更改，则组件将重新渲染
 * @TODO: 
 */

import { get, groupBy, maxBy, minBy, reject } from "lodash";
import { createSelector } from "reselect";
import { ETHER_ADDRESS, tokens, ethers, GREEN, RED, balanceFormat } from '../Helper'
import moment from "moment/moment";

const web3 = state => get(state, 'web3.connection')
export const web3Selector = createSelector(web3, web3 => web3);

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a);

const tokenLoaded = state => get(state, 'token.loaded', false)
export const tokenLoadedSelector = createSelector(tokenLoaded, tl => tl)

const token = state => get(state, 'token.contract', false)
export const tokenSelector = createSelector(token, t => t)

const exchangeLoaded = state => get(state, 'exchange.loaded', false)
export const exchangeLoadedSelector = createSelector(exchangeLoaded, el => el)

const exchange = state => get(state, 'exchange.contract', false)
export const exchangeSelector = createSelector(exchange, e => e)

export const contractsLoadedSelector = createSelector(
    tokenLoaded,
    exchangeLoaded,
    (tl, el) => (tl && el)
)


const allOrdersLoaded = state => get(state, 'exchange.allOrders.loaded', false)
const allOrders = state => get(state, 'exchange.allOrders.data', [])

const cancelledOrdersLoaded = state => get(state, 'exchange.cancelledOrders.loaded', false)
export const cancelledOrdersLoadedSelector = createSelector(
    cancelledOrdersLoaded,
    cld => cld
)

const cancelledOrders = state => get(state, 'exchange.cancelledOrders.data', [])
export const cancelledOrdersSelector = createSelector(
    cancelledOrders,
    (orders) => {
        // Sort order by time asc
        orders = orders.sort((a, b) => a.timestamp - b.timestamp)
        orders = decorateFilledOrders(orders)
        // Sort order by time desc
        orders = orders.sort((a, b) => b.timestamp - a.timestamp)
        console.log('cancelledOrders ==============', orders)
        return orders
    }
)

const filledOrdersLoaded = state => get(state, 'exchange.filledOrders.loaded', false)
export const filledOrdersLoadedSelector = createSelector(
    filledOrdersLoaded,
    fld => fld
)

const filledOrders = state => get(state, 'exchange.filledOrders.data', [])
export const filledOrdersSelector = createSelector(
    filledOrders,
    (orders) => {
        // Sort order by time asc
        orders = orders.sort((a, b) => a.timestamp - b.timestamp)
        orders = decorateFilledOrders(orders)
        // Sort order by time desc
        orders = orders.sort((a, b) => b.timestamp - a.timestamp)
        return orders
    }
)

const decorateFilledOrders = (orders) => {
    let preOrder = orders[0]
    return (
        orders.map((order) => {
            order = decorateOrder(order)
            order = decorateFilledOrder(order, preOrder)
            preOrder = order
            return order
        })
    )
}

// decarate order's etherAmount & tokenAmount datas
const decorateOrder = (order) => {
    let etherAmount
    let tokenAmount

    // if order.tokenGiveAdr equals ETHER_ADDRESS is buy order else is sell order
    if (order.tokenGiveAdr === ETHER_ADDRESS) {
        etherAmount = order.amountGive
        tokenAmount = order.amountGet
    }
    else {
        etherAmount = order.amountGet
        tokenAmount = order.amountGive
    }

    // calculate token price to 5 decimal places
    const precision = 100000
    let tokenPrice = (etherAmount / tokenAmount)
    tokenPrice = Math.round(tokenPrice * precision) / precision

    return ({
        ...order,
        etherAmount: ethers(etherAmount),
        tokenAmount: tokens(tokenAmount),
        tokenPrice: tokenPrice,
        formatTime: moment.unix(order.timestamp).format('YYYY-MM-DD HH:mm:ss')

    })
}

// Decorate filled order's tokenPriceClass "GREEN" or "RED"
const decorateFilledOrder = (order, preOrder) => {
    return ({
        ...order,
        tokenPriceClass: tokenPriceClass(order.tokenPrice, order.id, preOrder)
    })
}

const tokenPriceClass = (tokenPrice, orderId, preOrder) => {
    if (orderId === preOrder.id) {
        return GREEN
    }
    // Show green if tokenPrice > preOrder.tokenPrice
    if (tokenPrice >= preOrder.tokenPrice) {
        return GREEN
    } else {
        return RED
    }

    // Show red if tokenPrice < preOrder.tokenPrice

}

const orderBookLoaded = state => cancelledOrdersLoaded(state) && filledOrdersLoaded(state) && allOrdersLoaded(state)
export const orderBookLoadedSelector = createSelector(
    orderBookLoaded,
    obl => obl
)
// Open orders without filled orders & cancelled orders
const openOrders = state => {
    const all = allOrders(state)
    const filled = filledOrders(state)
    const cancelled = cancelledOrders(state)

    const openOrders = reject(all, (order) => {
        const orderFilled = filled.some((filledOrder) => filledOrder.id === order.id)
        const orderCancelled = cancelled.some((cancelledOrder) => cancelledOrder.id === order.id)
        return (orderFilled || orderCancelled)
    })
    return openOrders
}
export const orderBookSelector = createSelector(
    openOrders,
    (orders) => {
        orders = decorateBookOrders(orders)
        // Group order by "orderType", "sell" or "buy"
        orders = groupBy(orders, 'orderType')
        // Fetch buy orders
        const buyOrders = get(orders, 'buy', [])
        // Sort buy orders by tokenPrice desc
        orders = {
            ...orders,
            buyOrders: buyOrders.sort((a, b) => b.tokenPrice - a.tokenPrice)
        }
        // Fetch sell orders
        const sellOrders = get(orders, 'sell', [])
        // Sort sell orders by tokenPrice desc
        orders = {
            ...orders,
            sellOrders: sellOrders.sort((a, b) => b.tokenPrice - a.tokenPrice)
        }
        return orders
    }
)

const decorateBookOrders = (orders) => {
    return (
        orders.map((order) => {
            order = decorateOrder(order)
            order = decorateBookOrder(order)

            return order
        })
    )

}

const decorateBookOrder = (order) => {
    const orderType = order.tokenGiveAdr === ETHER_ADDRESS ? 'buy' : 'sell'
    return ({
        ...order,
        orderType,
        orderTypeClass: (orderType === 'buy' ? GREEN : RED),
        orderFillClass: (orderType === 'buy' ? 'sell' : 'buy')
    })
}

export const myFilledOrdersLoadedSelector = createSelector(filledOrdersLoaded, loaded => loaded)
export const myFilledOrdersSelector = createSelector(
    account,
    filledOrders,
    (account, orders) => {
        // Fetch my orders
        orders = orders.filter((o) => o.userAdr === account || o.userFillAdr === account)
        orders = orders.sort((a, b) => a.timestamp - b.timestamp)
        // Decorate orders add UI attributes
        orders = decorateMyFilledOrders(orders, account)
        return orders
    }
)

const decorateMyFilledOrders = (orders, account) => {
    return (
        orders.map((order) => {
            order = decorateOrder(order)
            order = decorateMyFilledOrder(order, account)

            return order
        })
    )
}

const decorateMyFilledOrder = (order, account) => {
    const isMyOrder = order.userAdr === account

    let orderType
    if (isMyOrder) {
        orderType = order.tokenGiveAdr === ETHER_ADDRESS ? 'buy' : 'sell'
    } else {
        orderType = order.tokenGiveAdr === ETHER_ADDRESS ? 'sell' : 'buy'
    }


    return ({
        ...order,
        orderType,
        orderTypeClass: (orderType === 'buy' ? GREEN : RED),
        orderSign: (orderType === 'buy' ? '+' : '-')
    })
}

export const myOpenOrdersLoadedSelector = createSelector(orderBookLoaded, loaded => loaded)
export const myOpenOrdersSelector = createSelector(
    account,
    openOrders,
    (account, orders) => {
        // Fetch my orders
        orders = orders.filter((o) => o.userAdr === account)
        orders = decorateMyOpenOrders(orders)
        // Sort order by time desc
        orders = orders.sort((a, b) => b.timestamp - a.timestamp)
        return orders
    }
)

const decorateMyOpenOrders = (orders, account) => {
    return (
        orders.map((order) => {
            order = decorateOrder(order)
            order = decorateMyOpenOrder(order, account)
            return order
        })
    )
}

const decorateMyOpenOrder = (order, account) => {
    let orderType = order.tokenGiveAdr === ETHER_ADDRESS ? 'buy' : 'sell'
    return ({
        ...order,
        orderType,
        orderTypeClass: (orderType === 'buy' ? GREEN : RED)
    })
}


export const priceChartLoadedSelector = createSelector(filledOrdersLoaded, loaded => loaded)
export const priceChartSelector = createSelector(
    filledOrders,
    (orders) => {
        orders = orders.sort((a,b) => a.timestamp - b.timestamp)
        orders = orders.map((o) => decorateOrder(o))

        // Get last 2 orders for final price & price change
        let secondLastOrder, lastOrder
        [secondLastOrder, lastOrder] = orders.slice(orders.length - 2, orders.length)
        // Get last order price
        const lastPrice = get(lastOrder, 'tokenPrice', 0)
        const secondLastPrice = get(secondLastOrder, 'tokenPrice', 0)


        return ({
            lastPrice,
            lastPriceChange: (lastPrice >= secondLastPrice ? '+' : '-'),
            series:[{
                data: buildGraphData(orders)
            }]
        })
    }
)

const buildGraphData = (orders) => {
    // Group the orders by hour for the graph
    orders = groupBy(orders, (o) => moment.unix(o.timestamp).startOf('hour').format())
    // Get each hour where data exists
    const hours = Object.keys(orders)
    // build the graph series
    const graphData = hours.map((hour) => {
        // Fetch all orders from current hour
        const group = orders[hour]
        // Calculate price values - open, high, low, close
        const open = group[0]
        const high = maxBy(group, 'tokenPrice')
        const low = minBy(group, 'tokenPrice')
        const close = group[group.length - 1]
        return({
            x: new Date(hour),
            y: [open.tokenPrice, high.tokenPrice, low.tokenPrice, close.tokenPrice]
        })
    })
    return graphData
}


const orderCancelling = state => get(state, 'exchange.orderCancelling', false)
export const orderCancellingSelector = createSelector(
    orderCancelling,
    status => status
)


// Balances oprations
const balancesLoading = state => get(state, 'exchange.balancesLoading', true)
export const balancesLoadingSelector = createSelector(
    balancesLoading,
    status => status
)

const ethBalance = state => get(state, 'web3.balance', true)
export const ethBalanceSelector = createSelector(
    ethBalance,
    (balance) => balanceFormat(balance)
)

const tokenBalance = state => get(state, 'token.balance', 0)
export const tokenBalanceSelector = createSelector(
    tokenBalance,
    (balance) => balanceFormat(balance)
)

const ethBalanceInExch = state => get(state, 'exchange.ethBalanceInExch', 0)
export const ethBalanceInExchSelector = createSelector(
    ethBalanceInExch,
    (balance) => balanceFormat(balance)
)

const tokenBalanceInExch = state => get(state, 'exchange.tokenBalanceInExch', 0)
export const tokenBalanceInExchSelector = createSelector(
    tokenBalanceInExch,
    (balance) => balanceFormat(balance)
)

const ethAmountDeposited = state => get(state, 'exchange.ethAmountDeposited', null)
export const ethAmountDepositedSelector = createSelector(
    ethAmountDeposited,
    amount => amount
)
