/**
 * Author: GKing
 * Date: 2022-11-19 08:45:25
 * LastEditors: GKing
 * LastEditTime: 2022-11-21 18:20:17
 * Description: 交易所合约
 *  - Deposit & Withdraw Funds 存入提取资金
 *  - Manage Orders - Make or Cancel 管理订单
 *  - Handle Trades - Charge fees 交易
 * TODO:
 * [X]Set the fee account
 * [X]Deposit Ether
 * []Withdraw Ether
 * [X]Deposit tokens
 * []Withdraw tokens
 * []Check balances
 * []Make order
 * []Cancel order
 * []Fill order
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
    // 在tokens映射中，用空白地址来存储eth
    address constant ETHER = address(0);
    // 交易所代币账单 关系 token地址 => (用户地址 => 数量)
    mapping(address => mapping(address => uint)) public tokens;

    // 存款事件 (代币地址，用户地址，当次存款数量，余额)
    event Deposit(address token, address user, uint amount, uint balance);
    event Withdraw(address token, address user, uint amount, uint balance);

    constructor(address _feeAccount, uint _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }
    /** 
     * name: 
     * desc: Fallback: reverts if Ether is sent to this smart contract by mistake
     */
    fallback() external {
        revert();
    }

    /** 
     * name: depositEther
     * desc: 给交易所空白地址发送eth
     * return {*}
     */
    function depositEther() payable public {
        tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].add(msg.value);
        emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
    }

    /** 
     * name: withdrawEthers
     * desc: Withdraw Ethers
     * param {uint} _amount
     * return {*}
     */    
    function withdrawEthers(uint _amount) public {
        require(tokens[ETHER][msg.sender] >= _amount, 'insufficient balances');
        tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].sub(_amount);
        payable(msg.sender).transfer(_amount);
        emit Withdraw(ETHER, msg.sender, _amount, tokens[ETHER][msg.sender]);
    }

    /**
     * name: depositToken
     * desc: 存入代币
     * param {address} _token 代币地址
     * param {uint} _amount 数量
     * return {*}
     */
    function depositToken(address _token, uint _amount) public {
        // don't allow Ether deposits
        require(_token != ETHER, 'do not deposit Ether');
        // 发送代币到本合约（交易所）
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));
        // 管理存款 -> 更新余额
        tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount);
        // 发送事件
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    
}
