/**
 * @Author: GKing
 * @Date: 2022-11-25 00:04:17
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-25 09:30:48
 * @Description: 
 * @TODO: 
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from "./reducers"

const loggerMiddleware = createLogger()
const middleware = []

// For Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer, 
        preloadedState,
        composeEnhancers(applyMiddleware(...middleware, loggerMiddleware))
        )
}