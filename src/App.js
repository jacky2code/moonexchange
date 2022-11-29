/**
 * @Author: GKing
 * @Date: 2022-11-15 18:11:15
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-29 15:33:54
 * @Description: 
 */
import React, { Component } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Content from './components/Content'
import { connect } from 'react-redux'
import { loadWeb3, loadAccount, loadToken, loadExchange } from './redux/interaction'
import { contractsLoadedSelector } from './redux/selectors'
//  import { useDispatch } from 'react-redux'

class App extends Component {

  componentDidMount() {
    this.loaadBlockchainData(this.props.dispatch);
  }
  async loaadBlockchainData(dispatch) {
    // const dispatch = useDispatch()

    const web3 = loadWeb3(dispatch)
    // const network = await web3.eth.net.getNetworkType();
    const networkId = await web3.eth.net.getId();
    await loadAccount(web3, dispatch);
    // const abi = Token.abi;
    // const tokenAdr = Token.networks[networkId].address;
    const token = await loadToken(web3, networkId, dispatch)
    if (!token) {
      window.alert('Token contract not deployed to current network. Please select another network with matemask')
      return
    }
    // const totalSupply = await token.methods.totalSupply().call();
    // console.log('totalSupply', totalSupply);

    const exchange = await loadExchange(web3, networkId, dispatch)
    if (!exchange) {
      window.alert('Exchange contract not deployed to current network. Please select another network with matemask')
      return
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        { this.props.contractsLoaded ? <Content /> : <div className='content'></div> }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contractsLoaded: contractsLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(App);
