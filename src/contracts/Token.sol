/**
 * Author: GKing
 * Date: 2022-11-15 22:19:58
 * LastEditors: GKing
 * LastEditTime: 2022-11-18 20:49:00
 * Description: 
 */
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Token {
    using SafeMath for uint;

    // token name
    string public name = "KaspaMoon";
    string public symbol = "KSMN";
    // token 精度
    uint public decimals = 18;
    // 当前合约的token总量
    uint public totalSupply;
    // 账本映射: 地址/余额
    mapping(address => uint) public balanceOf;
    // 批准映射: 第一个参数address代表批准人，第二个参数address代表发送给哪个地址（如交易所），第三个参数代表数量
    mapping(address => mapping(address => uint)) public allowance;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
    
    constructor() {
        totalSupply = 100000000 * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    /** 
     * name: transfer
     * desc: 把账户中的余额，由调用者发送到另一个账户中，并向链外汇报事件
     * param {address} _to
     * param {uint} _value
     * return {bool}
     */
    function transfer(address _to, uint _value) external returns (bool) {
        // 不能向0地址发送
        require(_to != address(0), 'address is invalid');
        // 余额不足校验
        require(balanceOf[msg.sender] >= _value, 'insufficient balances');
        // 发送者减掉数量
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
        // 接受者增加数量
        balanceOf[_to] = balanceOf[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    /**
     * name: approve 批准
     * desc: 把调用者msg.send账户中数量为_value的代币批准给另一个账户_spender
     * param {address} _spender 发送至的账户
     * param {uint} _value 数量
     * return {bool}
     */
    function approve(address _spender, uint _value) external returns (bool) {
        // 不能向0地址发送
        require(_spender != address(0), 'address is invalid');
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // /**
    //  * 向另一个合约存款的时候，另一个合约需要调用 transferFrom 把token拿到它的合约中
    //  */
    // function transferFrom(address sender, address _to, uint _value) external returns (bool) {
    //     allowance[sender][msg.sender] -= _value;
    //     balanceOf[sender] -= _value;
    //     balanceOf[_to] += _value;
    //     emit Transfer(sender, _to, _value);
    //     return true;
    // }

    // /**
    //  * 筑币方法(构造方法中有则注释该方法)
    //  */
    // // function mint(uint _value) external {
    // //     balanceOf[msg.sender] += _value;
    // //     totalSupply += _value;
    // //     emit Transfer(address(0), msg.sender, _value);
    // // }

    // /**
    //  * 销毁方法
    //  */
    // function burn(uint _value) external {
    //     balanceOf[msg.sender] -= _value;
    //     totalSupply -= _value;
    //     emit Transfer(msg.sender, address(0), _value);
    // }
}