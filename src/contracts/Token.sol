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
    // // 批准映射
    // mapping(address => mapping(address => uint)) public allowance;
    
    constructor() {
        totalSupply = 100000000 * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    /**
     * 把账户中的余额，由调用者发送到另一个账户中，并向链外汇报事件
     */
    function transfer(address _to, uint _value) external returns (bool) {
        // 发送者减掉数量
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
        // 接受者增加数量
        balanceOf[_to] = balanceOf[_to].add(_value);
        // emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // /**
    //  * 把账户中的数量批准给另一个账户
    //  */
    // function approve(address spender, uint _value) external returns (bool) {
    //     allowance[msg.sender][spender] = _value;
    //     emit Approval(msg.sender, spender, _value);
    //     return true;
    // }

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