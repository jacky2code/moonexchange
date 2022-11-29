/**
 * @Author: GKing
 * @Date: 2022-11-24 23:49:17
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-29 17:30:11
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
    default:
      return state
  }
}

function token(state = {}, action) {
  switch(action.type) {
    case 'TOKEN_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    default:
      return state
  }
}

function exchange(state = {}, action) {
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