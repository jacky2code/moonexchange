/**
 * @Author: GKing
 * @Date: 2022-12-01 09:01:24
 * @LastEditors: GKing
 * @LastEditTime: 2022-12-01 22:41:39
 * @Description: 
 * @TODO: 
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import Spinner from './Spinner'
import { 
    accountSelector, 
    buyOrderSelector, 
    exchangeSelector, 
    sellOrderSelector, 
    tokenSelector, 
    web3Selector 
} from '../redux/selectors'

import { 
    buyOrderAmountChanged,
    buyOrderPriceChanged,
    sellOrderAmountChanged,
    sellOrderPriceChanged
 } from '../redux/actions'

 import {
    createBuyOrder,
    createSellOrder
 } from '../redux/interaction'

const showCreateNewOrderForm = (props) => {
    const {
        dispatch,
        web3,
        token,
        exchange,
        account,
        buyOrder,
        sellOrder,
        showBuyTotal,
        showSellTotal
    } = props
    return (
        <Tabs defaultActiveKey='buy' className='bg-dark text-black'>
            <Tab eventKey='buy' title='Buy' className='bg-dark'>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    createBuyOrder(dispatch, exchange, token, web3, buyOrder, account)
                }}>
                    <div className='form-group small'>
                        <label>Buy Amount (KSMN)</label>
                        <div className='input-group'>
                            <input 
                            type='text' 
                            className='form-control form-control-sm bg-dark text-white' 
                            placeholder='Buy Amount'
                            onChange={(e) => dispatch(buyOrderAmountChanged(e.target.value))}
                            required
                            ></input>
                        </div>
                    </div>
                    <div className='form-group small'>
                        <label>Buy Price</label>
                        <div className='input-group'>
                            <input 
                            type='text' 
                            className='form-control form-control-sm bg-dark text-white' 
                            placeholder='Buy Price'
                            onChange={(e) => dispatch(buyOrderPriceChanged(e.target.value))}
                            required
                            ></input>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary btn-sm btn-block'>Buy Order</button>
                    { showBuyTotal ? <small>Total: {buyOrder.amount * buyOrder.price} ETH</small> : null}
                    
                </form>
            </Tab >
            <Tab eventKey='sell' title='Sell' className='bg-dark'>
            <form onSubmit={(event) => {
                    event.preventDefault()
                    createSellOrder(dispatch, exchange, token, web3, sellOrder, account)
                }}>
                    <div className='form-group small'>
                        <label>Sell Amount (KSMN)</label>
                        <div className='input-group'>
                            <input 
                            type='text' 
                            className='form-control form-control-sm bg-dark text-white' 
                            placeholder='Sell Amount'
                            onChange={(e) => dispatch(sellOrderAmountChanged(e.target.value))}
                            required
                            ></input>
                        </div>
                    </div>
                    <div className='form-group small'>
                        <label>Sell Price</label>
                        <div className='input-group'>
                            <input 
                            type='text' 
                            className='form-control form-control-sm bg-dark text-white' 
                            placeholder='Sell Price'
                            onChange={(e) => dispatch(sellOrderPriceChanged(e.target.value))}
                            required
                            ></input>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary btn-sm btn-block'>Sell Order</button>
                    { showSellTotal ? <small>Total: {sellOrder.amount * sellOrder.price} ETH</small> : null}
                    
                </form>
            </Tab>
        </Tabs >
    )
}

class CreateNewOrder extends Component {
    render() {
      return (
        <div className="card bg-dark text-white">
          <div className="card-header">New Order</div>
          <div className="card-body">
            {this.props.showCreateNewOrderForm ? showCreateNewOrderForm(this.props) : <Spinner />}
          </div>
        </div>
      )
    }
  }
  
  function mapStateToProps(state) {
    const buyOrder = buyOrderSelector(state)
    const sellOrder = sellOrderSelector(state)
    return {
        
        exchange: exchangeSelector(state),
        account: accountSelector(state),
        token: tokenSelector(state),
        web3: web3Selector(state),
        buyOrder: buyOrder,
        sellOrder: sellOrder,
        showCreateNewOrderForm: !buyOrder.creating && !sellOrder.creating,
        showBuyTotal: buyOrder.amount && buyOrder.price,
        showSellTotal: sellOrder.amount && sellOrder.price
    }
  }
  
  // export default App
  export default connect(mapStateToProps)(CreateNewOrder)