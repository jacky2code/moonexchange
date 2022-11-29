/**
 * @Author: GKing
 * @Date: 2022-11-25 21:07:00
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-29 15:34:23
 * @Description: 
 * @TODO: 
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { accountSelector } from '../redux/selectors'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a href="localhost:3000" className="navbar-brand">Moon Exchange</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" > {/* 这里少了点 prop */}
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a
                            className="nav-link small"
                            href={`https://etherscan.io/address/${this.props.account}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.props.account}
                        </a>
                    </li>

                </ul>

            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
      account: accountSelector(state)
    }
   }
  
   export default connect(mapStateToProps)(Navbar);

