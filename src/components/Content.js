/**
 * @Author: GKing
 * @Date: 2022-11-25 21:28:16
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-25 21:32:56
 * @Description: 
 * @TODO: 
 */

/**
 * @Author: GKing
 * @Date: 2022-11-25 21:07:00
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-25 21:26:56
 * @Description: 
 * @TODO: 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

class Content extends Component {
    render() {
        return (
            <div className="content">

                <div className="vertical-split">
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="localhost:3000" className="card-link">Card link</a>
                        </div>
                    </div>
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="localhost:3000" className="card-link">Card link</a>
                        </div>
                    </div>
                </div>

                <div className="vertical">
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="localhost:3000" className="card-link">Card link</a>
                        </div>
                    </div>
                </div>

                <div className="vertical-split">
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="localhost:3000" className="card-link">Card link</a>
                        </div>
                    </div>
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="localhost:3000" className="card-link">Card link</a>
                        </div>
                    </div>
                </div>

                <div className="vertical">
                    <div className="card bg-dark text-white">
                        <div className="card-header">Card Title</div>
                        <div className="card-body">
                            <p className="card-text">Some quick example text</p>
                            <a href="localhost:3000" className="card-link">Card link</a>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(Content);






