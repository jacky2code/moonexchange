/**
 * Author: GKing
 * Date: 2022-11-19 08:45:25
 * LastEditors: GKing
 * LastEditTime: 2022-11-22 22:37:00
 * Description: 交易所合约
 *  - Deposit & Withdraw Funds 存入提取资金
 *  - Manage Orders - Make or Cancel 管理订单
 *  - Handle Trades - Charge fees 交易
 * TODO:
 * [X] Set the fee account
 * [X] Deposit Ether
 * [X] Withdraw Ether
 * [X] Deposit tokens
 * [X] Withdraw tokens
 * [X] Check balances
 * [X] Make order
 * [X] Cancel order
 * [X] Fill order
 * [X] Charge Fees
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
    mapping(uint => _Order) public orders;
    mapping(uint => bool) public ordersCancelled;
    mapping(uint => bool) public ordersFilled;
    // Order ID
    uint public orderCount;
    

    // 存款事件 (代币地址，用户地址，当次存款数量，余额)
    event Deposit(address token, address user, uint amount, uint balance);
    event Withdraw(address token, address user, uint amount, uint balance);
    event Order (
        uint id,
        address userAdr,
        address tokenGetAdr,
        uint amountGet,
        address tokenGiveAdr,
        uint amountGive,
        uint timestamp
    );
    event Cancel (
        uint id,
        address userAdr,
        address tokenGetAdr,
        uint amountGet,
        address tokenGiveAdr,
        uint amountGive,
        uint timestamp
    );
    event Trade (
        uint id,
        address userAdr,
        address tokenGetAdr,
        uint amountGet,
        address tokenGiveAdr,
        uint amountGive,
        address userFillAdr,
        uint timestamp
    );

    // Order model
    struct _Order {
        uint id;
        address userAdr;
        address tokenGetAdr;
        uint amountGet;
        address tokenGiveAdr;
        uint amountGive;
        uint timestamp;
    }


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
        require(tokens[ETHER][msg.sender] >= _amount, 'Insufficient balances');
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
        require(_token != ETHER, 'Do not deposit Ether');
        // 发送代币到本合约（交易所）
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));
        // 管理存款 -> 更新余额
        tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount);
        // 发送事件
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    /** 
     * name: withdrawTokens
     * desc: Withdraw Tokens
     * param {address} _token 
     * param {uint} _amount
     * return {*}
     */    
    function withdrawTokens(address _token, uint _amount) public {
        require(_token != ETHER, 'Do not withdraw Ether');
        require(tokens[_token][msg.sender] >= _amount, 'Insufficient balances');
        tokens[_token][msg.sender] = tokens[_token][msg.sender].sub(_amount);
        require(Token(_token).transfer(msg.sender, _amount));
        emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    /** 
     * name: balanceOf
     * desc: user tokens balance
     * param {address} _tokenAdr
     * param {address} _userAdr
     * return {*}
     */
    function balanceOf(address _tokenAdr, address _userAdr) public view returns (uint) {
        return tokens[_tokenAdr][_userAdr];
    }

    /** 
     * name: createOrder
     * desc: Create order
     * param {address} _tokenGetAdr
     * param {uint} _amountGet
     * param {address} _tokenGiveAdr
     * param {uint} _amountGive
     * return {*}
     */
    function createOrder(address _tokenGetAdr, uint _amountGet, address _tokenGiveAdr, uint _amountGive) public {
        orderCount = orderCount.add(1);
        orders[orderCount] = _Order(orderCount, msg.sender, _tokenGetAdr, _amountGet, _tokenGiveAdr, _amountGive, block.timestamp);
        emit Order(orderCount, msg.sender, _tokenGetAdr, _amountGet, _tokenGiveAdr, _amountGive, block.timestamp);
    }

    /** 
     * name: cancelOrder
     * desc: Cancel order with order id
     * param {uint} _id
     * return {*}
     */
    function cancelOrder(uint _id) public {
        _Order storage _order = orders[_id];
        require(_order.userAdr == msg.sender, 'not your order');
        require(_order.id == _id, 'wrong order id');
        ordersCancelled[_id] = true;
        emit Cancel(_order.id, msg.sender, _order.tokenGetAdr, _order.amountGet, _order.tokenGiveAdr, _order.amountGive, block.timestamp);
    }

    /** 
     * name: fillOrder
     * desc: Fill order with id
     * param {uint} _id
     * return {*}
     */  
    function fillOrder(uint _id) public {
        require(_id > 0 && _id <= orderCount, 'invalid order id');
        require(!ordersFilled[_id], 'order already filled');
        require(!ordersCancelled[_id], 'order already cancelled');
        // Fetch the Order
        _Order storage _order = orders[_id];
        _trade(_order.id, _order.userAdr, _order.tokenGetAdr, _order.amountGet, _order.tokenGiveAdr, _order.amountGive);
        // Mark order as filled
        ordersFilled[_id] = true;
    }

    function _trade(uint _orderId, address _userAdr, address _tokenGetAdr, uint _amountGet, address _tokenGiveAdr, uint _amountGive) internal {
        // Fee paid by the user that fills the order, a.k.a. msg.sender.
        // Fee deducted from _amountGet
        uint _feeAmount = _amountGive.mul(feePercent).div(100);
        
        // Exchange Trade
        tokens[_tokenGetAdr][msg.sender] = tokens[_tokenGetAdr][msg.sender].sub(_amountGet.add(_feeAmount));
        tokens[_tokenGetAdr][_userAdr] = tokens[_tokenGetAdr][_userAdr].add(_amountGet);
        // Charge fees
        tokens[_tokenGetAdr][feeAccount] = tokens[_tokenGetAdr][feeAccount].add(_feeAmount);
        tokens[_tokenGiveAdr][_userAdr] = tokens[_tokenGiveAdr][_userAdr].sub(_amountGive);
        tokens[_tokenGiveAdr][msg.sender] = tokens[_tokenGiveAdr][msg.sender].add(_amountGive);
        
        // Emit trade event
        emit Trade(_orderId, _userAdr, _tokenGetAdr, _amountGet, _tokenGiveAdr, _amountGive, msg.sender, block.timestamp);
    }
    
}
