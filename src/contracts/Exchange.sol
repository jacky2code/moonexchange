/**
 * Author: GKing
 * Date: 2022-11-19 08:45:25
 * LastEditors: GKing
 * LastEditTime: 2022-11-19 14:59:13
 * Description: 交易所合约
 *  - Deposit & Withdraw Funds 存入提取资金
 *  - Manage Orders - Make or Cancel 管理订单
 *  - Handle Trades - Charge fees 交易
 * TODO: 
 * Set the fee account
 * Deposit Ether
 * Withdraw Ether
 * Deposit tokens
 * Withdraw tokens
 * Check balances
 * Make order
 * Cancel order
 * Fill order
 */
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Token.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract Exchange {
    using SafeMath for uint256;

    // 收取交易所交易费的账户
    address public feeAccount;
    // 交易费率
    uint public feePercent;
    // 交易所代币账单 关系 token地址 => (用户地址 => 数量)
    mapping(address => mapping(address => uint)) public tokens;

    constructor(address _feeAccount, uint _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    /** 
     * name: despositToken
     * desc: 存入代币
     * param {address} _token 代币地址
     * param {uint} _amount 数量
     * return {*}
     */
    function despositToken(address _token, uint _amount) public {
        // 发送代币到本合约（交易所）
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));
        // 管理存款 - 更新余额
        tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount); 
        // 发送事件
    }
}
