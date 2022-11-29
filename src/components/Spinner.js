/**
 * @Author: GKing
 * @Date: 2022-11-27 15:33:47
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-29 16:53:25
 * @Description: 
 * @TODO: 
 */
import React from "react"

export default function Spinner({ type }) {
    if (type === 'table') {
        return(<tbody className="spinner-border text-light text-center"></tbody>)
    } else {
        return(<div className="spinner-border text-light text-center"></div>)
    }
}