// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IERC20 {
    
    /**
     * 当前合约的 token 总量
     */
    function totalSupply() external view returns (uint);

    /**
     * 某一个账户的当前余额
     */
    function balanceOf(address account) external view returns (uint);

    /**
     * 把账户中的余额，由调用者发送到另一个账户中，并向链外汇报事件
     */
    function transfer(address recipient, uint amount) external returns (bool);

    /**
     * 查询某账户向另一账户批准额度有多少
     */
    function allowance(address owner, address spender) external view returns (uint);

    /**
     * 把账户中的数量批准给另一个账户
     */
    function approve(address spender, uint amount) external returns (bool);

    /**
     * 向另一个合约存款的时候，另一个合约需要调用 transferFrom 把token拿到它的合约中
     */
    function transferFrom(address sender, address recipient, uint amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint amount);

    event Approval(address indexed owner, address indexed spender, uint amount);
}

contract Token{
    // token name
    string public name = "KaspaMoon";
    string public symbol = "KSMN";
    // token 精度
    uint public decimals = 18;
    // 当前合约的token总量
    uint public totalSupply;
    // // 账本映射
    // mapping(address => uint) public balanceOf;
    // // 批准映射
    // mapping(address => mapping(address => uint)) public allowance;
    
    constructor() {
        totalSupply = 100000000 * (10 ** decimals);
    }

    // /**
    //  * 把账户中的余额，由调用者发送到另一个账户中，并向链外汇报事件
    //  */
    // function transfer(address recipient, uint amount) external returns (bool) {
    //     // 发送者减掉数量
    //     balanceOf[msg.sender] -= amount;
    //     // 接受者增加数量
    //     balanceOf[recipient] -= amount;
    //     emit Transfer(msg.sender, recipient, amount);
    //     return true;
    // }

    // /**
    //  * 把账户中的数量批准给另一个账户
    //  */
    // function approve(address spender, uint amount) external returns (bool) {
    //     allowance[msg.sender][spender] = amount;
    //     emit Approval(msg.sender, spender, amount);
    //     return true;
    // }

    // /**
    //  * 向另一个合约存款的时候，另一个合约需要调用 transferFrom 把token拿到它的合约中
    //  */
    // function transferFrom(address sender, address recipient, uint amount) external returns (bool) {
    //     allowance[sender][msg.sender] -= amount;
    //     balanceOf[sender] -= amount;
    //     balanceOf[recipient] += amount;
    //     emit Transfer(sender, recipient, amount);
    //     return true;
    // }

    // /**
    //  * 筑币方法(构造方法中有则注释该方法)
    //  */
    // // function mint(uint amount) external {
    // //     balanceOf[msg.sender] += amount;
    // //     totalSupply += amount;
    // //     emit Transfer(address(0), msg.sender, amount);
    // // }

    // /**
    //  * 销毁方法
    //  */
    // function burn(uint amount) external {
    //     balanceOf[msg.sender] -= amount;
    //     totalSupply -= amount;
    //     emit Transfer(msg.sender, address(0), amount);
    // }
}