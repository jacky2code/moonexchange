/**
 * Author: GKing
 * Date: 2022-11-15 22:19:58
 * LastEditors: GKing
 * LastEditTime: 2022-11-22 21:41:36
 * Description: 代币合约
 */
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Token is IERC20 {
    using SafeMath for uint256;

    // token name
    string public name = "KaspaMoon";
    string public symbol = "KSMN";
    // token 精度
    uint256 public decimals = 18;
    // 当前合约的token总量
    uint256 public totalSupply;
    // 账本映射: 地址/余额
    mapping(address => uint256) public balanceOf;
    // 批准映射关系 批准人 => (发送至(如交易所)地址 => 数量))
    mapping(address => mapping(address => uint256)) public allowance;

    // event Transfer(address indexed from, address indexed to, uint256 value);
    // event Approval(
    //     address indexed owner,
    //     address indexed spender,
    //     uint256 value
    // );

    constructor() {
        totalSupply = 100000000 * (10**decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    /**
     * name: 发送代币
     * desc: 把账户中的余额，由调用者发送到另一个账户中
     * param {address} _from 发送方
     * param {address} _to 接收方
     * param {uint} _value 数量
     */
    function _transfer(
        address _from,
        address _to,
        uint256 _value
    ) internal {
        // 不能向0地址发送
        require(_to != address(0), "address is invalid");
        // 发送者减掉数量
        balanceOf[_from] = balanceOf[_from].sub(_value);
        // 接受者增加数量
        balanceOf[_to] = balanceOf[_to].add(_value);
        emit Transfer(_from, _to, _value);
    }

    /**
     * name: transfer
     * desc: 把账户中的余额，由调用者发送到另一个账户中，并向链外汇报事件
     * param {address} _to
     * param {uint} _value
     * return {bool}
     */
    function transfer(address _to, uint256 _value) external returns (bool) {
        // 余额不足校验
        require(balanceOf[msg.sender] >= _value, "insufficient balances");
        _transfer(msg.sender, _to, _value);
        return true;
    }

    /**
     * name: approve 批准
     * desc: 把调用者msg.send账户中数量为_value的代币批准给另一个账户_spender
     * param {address} _spender 发送至的账户
     * param {uint} _value 数量
     * return {bool}
     */
    function approve(address _spender, uint256 _value) external returns (bool) {
        // 不能向0地址发送
        require(_spender != address(0), "address is invalid");
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /**
     * name: transferFrom
     * desc: 向另一个合约存款的时候，另一个合约需要调用 transferFrom 把token拿到它的合约中
     * param {address} _from
     * param {address} _to
     * param {uint} _value
     * return {bool}
     */
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool) {
        // 小于等于拥有数量
        require(_value <= balanceOf[_from]);
        // 小于等于批准数量
        require(_value <= allowance[_from][msg.sender]);
        _transfer(_from, _to, _value);
        allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value);
        return true;
    }

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
