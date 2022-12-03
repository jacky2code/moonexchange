/**
 * @Author: GKing
 * @Date: 2022-11-24 23:49:17
 * @LastEditors: GKing
 * @LastEditTime: 2022-12-03 13:33:42
 * @Description: 
 *  Reducers 总是通过复制现有状态值，更新副本来不可变地生成新状态
 *  Redux Toolkit createSlice 函数为您生成“slice reducer”函数，并让您编写 “mutable 可变”代码，内部自动将其转变为安全的不可变更新
 *  这些 slice 化 reducer 函数被添加到 configureStore 中的 reducer 字段中，并定义了 Redux store 中的数据和状态字段名称
 * @TODO: 
 */
import { combineReducers } from 'redux'


/**
 * 这是一个 reducer 函数：接受当前 state 值和描述“发生了什么”的 action 对象，它返回一个新的 state 值。
 * reducer 函数签名是 : (state, action) => newState
 *
 * Redux state 应该只包含普通的 JS 对象、数组和原语。
 * 根状态值通常是一个对象。 重要的是，不应该改变 state 对象，而是在 state 发生变化时返回一个新对象。
 *
 * 你可以在 reducer 中使用任何条件逻辑。 在这个例子中，我们使用了 switch 语句，但这不是必需的。
 * 
 */

function web3(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection }
    case 'WEB3_ACCOUNT_LOADED':
      return { ...state, account: action.account }
    case 'ETH_BALANCE_LOADED':
      return { ...state, balance: action.ethBalance }
    default:
      return state
  }
}

function token(state = {}, action) {
  switch(action.type) {
    case 'TOKEN_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'TOKEN_BALANCE_LOADED':
      return { ...state, balance: action.tokenBalance }
    default:
      return state
  }
}

function exchange(state = {}, action) {
  // let index, data

  switch(action.type) {
    case 'EXCHANGE_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'CANCELLED_ORDERS_LOADED':
      return { ...state, cancelledOrders: {loaded: true, data: action.cancelledOrders}}
    case 'FILLED_ORDERS_LOADED':
      return { ...state, filledOrders: {loaded: true, data: action.filledOrders}}
    case 'ALL_ORDERS_LOADED':
      return { ...state, allOrders: {loaded: true, data: action.allOrders}}
    case 'ORDER_CANCELLING':
      return { ...state, orderCancelling: true}
    case 'ORDER_CANCELLED':
      return {
        ...state,
        orderCancelling: false,
        cancelledOrders: {
          ...state.cancelledOrders,
          data: [
            ...state.cancelledOrders.data,
            action.order
          ]
        }
      }
    case 'ORDER_FILLING':
      return { ...state, orderFilling: true}
    case 'ORDER_FILLED':
      const order_index = state.filledOrders.data.findIndex(order => order.id === action.order.id)
      let filledOrdersData
            if (order_index === -1) {
              filledOrdersData = [...state.filledOrders.data, action.order]
            } else {
              filledOrdersData = state.filledOrders.data
            }
      return {
          ...state,
          orderFilling: false,
          filledOrders: {
            ...state.filledOrders,
            data: filledOrdersData
          }
        }
    case 'TOKEN_BALANCE_IN_EXCH_LOADED':
      return { ...state, tokenBalanceInExch: action.tokenBalanceInExch }
    case 'ETH_BALANCE_IN_EXCH_LOADED':
      return { ...state, ethBalanceInExch: action.ethBalanceInExch }
    case 'ALL_BALANCES_LOADED':
      return { ...state, balancesLoading: false }
    case 'ALL_BALANCES_LOADING':
      return { ...state, balancesLoading: true }
    case 'ETHDEPOSITED_AMOUNTCHANGED':
      return { ...state, ethAmountDeposited: action.ethAmountDeposited }
    case 'ETHWITHDRAWED_AMOUNTCHANGED':
      return { ...state, ethAmountWithdrawed: action.ethAmountWithdrawed }
    case 'TOKENDEPOSITED_AMOUNTCHANGED':
      return { ...state, tokenAmountDeposited: action.tokenAmountDeposited }
    case 'TOKENWITHDRAWED_AMOUNTCHANGED':
      return { ...state, tokenAmountWithdrawed: action.tokenAmountWithdrawed }
    case 'BUY_ORDER_AMOUNT_CHANGED':
      return { ...state, buyOrder: { ...state.buyOrder, amount: action.buyOrderAmount }  }
    case 'BUY_ORDER_PRICE_CHANGED':
      return { ...state, buyOrder: { ...state.buyOrder, price: action.buyOrderPrice } }
    case 'BUY_ORDER_CREATING':
      return { ...state, buyOrder: { ...state.buyOrder, amount: null, price: null, creating: true}}
    case 'ORDER_CREATED':
      const index = state.allOrders.data.findIndex(
        (order) => order.id === action.order.id
      )
      const data =
        index === -1 ? [...state.allOrders.data, action.order] : state.allOrders.data
      return {
        ...state,
        allOrders: {
          ...state.allOrders,
          data,
        },
        buyOrder: {
          ...state.buyOrder,
          creating: false,
        },
        sellOrder: {
          ...state.sellOrder,
          creating: false,
        },
      }
    case 'SELL_ORDER_AMOUNT_CHANGED':
      return { ...state, sellOrder: { ...state.sellOrder, amount: action.sellOrderAmount }  }
    case 'SELL_ORDER_PRICE_CHANGED':
      return { ...state, sellOrder: { ...state.sellOrder, price: action.sellOrderPrice } }
    case 'SELL_ORDER_CREATING':
      return { ...state, sellOrder: { ...state.sellOrder, amount: null, price: null, creating: true}}
    default:
      return state
  }
}

let rootReducer = combineReducers({
  web3: web3,
  token: token,
  exchange: exchange

})

export default rootReducer