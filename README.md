# moonExchange

## 1. 开发环境

使用 conda 安装环境

- Node.js 

  - 安装 Node https://nodejs.org/zh-cn/

  - 查看 Node 版本

    ```bash
    node -v
    ```

- python 2.7

- 安装 Ganache，用于创建私链测试

- Node-gyp https://github.com/nodejs/node-gyp 要求3.6.2版本

  ```bash
  npm install -g node-gyp@3.6.2
  ```

- truffle 智能合约开发框架（需要版本 5.1.39）

  - 先查看 truffle 版本

  ```bash
  truffle -v
  ```

  - 安装 truffle

  ```bash
  npm install -g truffle
  ```

  - 卸载 truffle

  ```bash
  nmp uninstall -g truffle
  ```

- Create-react-app 需要3.3.1版本

  ```bash
  npm install -g create-react-app@3.3.1
  ```

- git

## 2. 其他设置

- chrome 插件

  - MetaMask 钱包

  - redux devtools 允许 react app 中存储数据

- infura 允许我们连接到以太坊区块链上，而不需要我们自己的节点

  - jacky2code@gmail.com
  - MAINNET:https://mainnet.infura.io/v3/894570a98d0449d48cce0740f725eb22

- HEROKU 主机提供商

  - jacky2code@gmail.com

## 3. 创建项目

- 使用 create-react-app 创建项目

  ```bash
  create-react-app moon-exchange
  ```

- 运行项目

  ```bash
  npm run start
  ```

- 添加项目依赖

  - apexcharts 现代化图标库
  - babel js编译器
  - bootstrap 简洁、直观、强悍的前端开发框架，让web开发更迅速简单
  - chai 测试框架
  - dotenv 读取环境变量
  - lodash 用于处理数据结构
  - moment 处理时间
  - redux 状态容器，提供可预测的状态管理
  - reselect 用于从redux 中读取信息
  - solidity-coverage 测试solidity代码坚固完整性
  - truffle 构建智能合约及相关库和网络，使app和区块链对话

  旧版本

  ```json
  "dependencies": {
      "apexcharts": "3.6.3",  
      "babel-polyfill": "6.26.0",
      "babel-preset-env": "1.7.0",
      "babel-preset-es2015": "6.24.1",
      "babel-preset-stage-2": "6.24.1",
      "babel-preset-stage-3": "6.24.1",
      "babel-register": "6.26.0",
      "bootstrap": "4.3.1",
      "chai": "4.2.0",
      "chai-as-promised": "7.1.1",
      "chai-bignumber": "3.0.0",
      "dotenv": "6.2.0",
      "lodash": "4.17.11",
      "moment": "2.24.0",
      "openzeppelin-solidity": "2.1.3",
      "react": "16.8.4",
      "react-apexcharts": "1.3.0",
      "react-bootstrap": "^2.6.0",
      "react-dom": "16.8.4",
      "react-redux": "5.1.1",
      "react-scripts": "2.1.3",
      "redux": "3.7.2",
      "redux-logger": "3.0.6",
      "reselect": "4.0.0",
      "solidity-coverage": "0.5.11",
      "truffle": "5.0.7",
      "truffle-flattener": "1.3.0",
      "truffle-hdwallet-provider": "^1.0.4",
      "truffle-hdwallet-provider-privkey": "^1.0.3",
      "web3": "^1.8.1",
      "web-vitals": "^2.1.4"
    },
  ```

  新版本

  ```json
  "dependencies": {
      "@testing-library/jest-dom": "5.16.5",
      "@testing-library/react": "13.4.0",
      "@testing-library/user-event": "14.4.3",
      "apexcharts": "3.36.3",
      "babel-polyfill": "6.26.0",
      "babel-preset-env": "1.7.0",
      "babel-preset-es2015": "6.24.1",
      "babel-preset-stage-2": "6.24.1",
      "babel-preset-stage-3": "6.24.1",
      "babel-register": "6.26.0",
      "bootstrap": "5.2.2",
      "chai": "4.3.7",
      "chai-as-promised": "7.1.1",
      "chai-bignumber": "3.1.0",
      "dotenv": "16.0.3",
      "lodash": "4.17.21",
      "moment": "2.29.4",
      "openzeppelin-contracts": "4.0.0",
      "react": "18.2.0",
      "react-apexcharts": "1.4.0",
      "react-bootstrap": "2.6.0",
      "react-dom": "18.2.0",
      "react-redux": "8.0.5",
      "react-scripts": "5.0.1",
      "redux": "4.2.0",
      "redux-logger": "3.0.6",
      "reselect": "4.1.7",
      "solidity-coverage": "0.8.2",
      "truffle": "5.6.5",
      "truffle-flattener": "1.6.0",
      "truffle-hdwallet-provider": "1.0.17",
      "truffle-hdwallet-provider-privkey": "0.3.0",
      "web3":"1.8.1",
      "web-vitals": "2.1.4"
    },
  ```

- 创建 truffle 项目

  在项目根目录中执行一下命令：

  ```bash
  truffle init
  ```

- JavaScript编译器预设

  - 根目录新建 .babelrc 文件，输入以下内容

    ```json
    {
        "presets": ["es2015", "stage-2", "stage-3"]
    }
    ```

  - 在 truffle-config.js 添加以下：

    ```js
    require('babel-register');
    require('babel-polyfill');
    ```

- 环境变量文件，允许管理环境变量

  - 根目录创建 .env 文件

  - 在 truffle-config.js 添加以下：

    ```js
    require('dotenv').config();
    ```

- 整理文件目录，拆分 react 和 智能合约 目录

  - 在 truffle-config.js 中 "networks:{}," 代码之后添加以下：并整理项目文件夹

    ```js
    contracts_directory: './src/contracts',
    contracts_build_directory: './src/abis/',
    ```

- git 忽略文件

  添加 .env 的忽略，如：

  ```
  # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
  
  .env
  .env.local
  ```



## 4. 冒烟测试

需要开发两个合约

- 一个 ERC20 代币合约
- 加密货币交易合约

### 4.1 代币合约

- 在 contracts 文件夹中创建 Token.sol

- 启动 ganache，在 truffle-config.js 中添加 ganache 本地网络

  ```js
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
  },
  ```

- 在 truffle-config.js 中，配置编译器

  ```js
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      //  evmVersion: "byzantium"
      }
    }
  }
  ```

  - 编译

    ```bash
    truffle compile
    ```

## 5. 代币智能合约

### 5.1 部署合约并测试

- 在 contracts 文件夹中添加 Token.sol

  ```solidity
  / SPDX-License-Identifier: MIT
  pragma solidity ^0.8.7;
  
  ontract Token{
      // token name
      string public name = "KaspaE";
      string public symbol = "KSE";
      // token 精度
      uint public decimals = 18;
      // 当前合约的token总量
      uint public totalSupply;
      
      constructor() {
          totalSupply = 100000000 * (10 ** decimals);
      }
  }
  ```

- 在 test 文件夹中添加 Token.test.js

  ```js
  const Token = artifacts.require('./Token')
  require('chai')
      .use(require('chai-as-promised'))
      .should()
  
  // 合同函数
  contract('Token', (accounts) => {
      const name = 'KaspaE'
      const symbol = 'KSE'
      const decimals = '18'
      const totalSupply = '100000000000000000000000000'
      let token
  
      beforeEach(async () => {
          token = await Token.new()
      })
  
      describe('deployment', () => {
          it('tracks the name', async () => {
              const result = await token.name()
              result.should.equal(name)
          })
  
          it('tracks the symbol', async () => {
              const result = await token.symbol()
              result.should.equal(symbol)
          })
  
          it('tracks the decimals', async () => {
              const result = await token.decimals()
              result.toString().should.equal(decimals)
          })
  
          it('tracks the totalSupply', async () => {
              const result = await token.totalSupply()
              result.toString().should.equal(totalSupply)
          })
      })
  })
  ```

- 进行测试

  ```bash
  truffle test
  ```

  输出测试结果：

  ```bash
  Using network 'development'.
  
  
  Compiling your contracts...
  ===========================
  > Compiling ./src/contracts/Token.sol
  > Artifacts written to /var/folders/84/d1j8r9m90rggg4b5vrwhck_m0000gn/T/test--52176-p1Vu9UNthx8j
  > Compiled successfully using:
     - solc: 0.8.17+commit.8df45f5f.Emscripten.clang
  
  
    Contract: Token
      deployment
        ✔ tracks the name (126ms)
        ✔ tracks the symbol (115ms)
        ✔ tracks the decimals (170ms)
        ✔ tracks the totalSupply (49ms)
  
  
    4 passing (3s)
  ```

### 5.2 总供应量分发测试

- 总供应量分发给部署者

  - 在 Token.sol 中添加账单映射，及构造方法中分发

    ```solidity
    // more code ...
    // 账本映射: 地址/余额
    mapping(address => uint) public balanceOf;
    
    constructor() {
        totalSupply = 100000000 * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;
    }
    // more code ...
    ```

  - 在 Token.test.js 中添加测试单元

    ```js
    // 合同函数
    contract('Token', ([deployer]) => {
      it('assigns the total supply to the deployer', async () => {
        const result = await token.balanceOf(deployer)
        result.toString().should.equal(totalSupply)
    	})
    }
    ```

### 5.3 发送代币并测试

- 发送并测试

  - solidity 代码库
    - OpenZeppelin 各种安全的代码库

  - 在 Token.sol 中引入 SafeMath.sol

    ```solidity
    import "@openzeppelin/contracts/utils/math/SafeMath.sol";
    ```

    合约中使用

    ```solidity
    using SafeMath for uint;
    ```


  - 新增发送方法

    ```solidity
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
    ```

  - 单元测试

    - 新增 Helpers.js 拆分公共方法 tokens 函数

      ```js
      // wei转换bigNumber
      export const tokens = (n) => {
          return new web3.utils.toBN(
              web3.utils.toWei(n.toString(), 'ether')
          )
      }
      ```

    - Token.test.js 中单元测试

      ```js
      describe('sending tokens', () => {
          it('transfers token balances', async () => {
              let balanceOf
              // Before transfer
              balanceOf = await token.balanceOf(deployer)
              console.log("deployer balance before transfer", balanceOf.toString())
              balanceOf = await token.balanceOf(receiver)
              console.log("receiver balance before transfer", balanceOf.toString())
      
              // Transfer
              await token.transfer(receiver, tokens(100), {from: deployer})
      
              // After transfer
              balanceOf = await token.balanceOf(deployer)
              console.log("deployer balance after transfer", balanceOf.toString())
              balanceOf = await token.balanceOf(receiver)
              console.log("receiver balance after transfer", balanceOf.toString())
          })
      })
      ```

- 发送事件并测试

  - 定义事件

    起初为了方便循序渐进学，先自己定义事件，后续中可以继承 IERC20.sol 接口

    ```solidity
    event Transfer(address indexed from, address indexed to, uint value);
    ```

  - 在 transfer 方法中添加事件

    ```solidity
    emit Transfer(msg.sender, _to, _value);
    ```

  - 添加测试单元

    ```js
    // 发送‘发送代币’事件
    it('emits a transfer event', async () => {
        const log = result.logs[0]
        log.event.should.eq('Transfer')
        const event = log.args
        event.from.toString().should.eq(deployer, 'from is correct')
        event.to.toString().should.eq(receiver, 'receiver is correct')
        event.value.toString().should.eq(amount.toString(), 'value is correct')
    })
    ```

- 发送代币失败测试

  - 在 transfer 函数中添加 require 条件

    ```solidity
    // 不能向0地址发送
    require(_to != address(0), 'address is invalid');
    // 余额不足校验
    require(balanceOf[msg.sender] >= _value, 'insufficient balances');
    ```

  - 添加测试代码

    - 重构代码，分别测试成功和失败

      ```solidity
      // 订阅测试成功
      describe('success', () => {
          beforeEach(async () => {
              amount = tokens(100)
              // Transfer
              result = await token.transfer(receiver, amount, {from: deployer})
          })
          // 发送代币余额
          // more code ...
          // 发送‘发送代币’事件
          // more code ...
      })
      
      // 订阅测试失败
      describe('failure', () => {
      	// more code ...
      })
      ```

    - 添加失败测试单元

      - Helper.js 中添加常量

        ```js
        export const EVM_REVERT = 'VM Exception while processing transaction: revert'
        ```

      - 失败测试单元

        ```js
        // 订阅测试失败
        describe('failure', () => {
            // 余额不足测试
            it('rejects insufficient balances', async() => {
                let invalidAmount
                invalidAmount = tokens(10000000000) // greater than totalSupply
                await token.transfer(receiver, invalidAmount, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
                
                invalidAmount = tokens(10)
                // receiver has no tokens
                await token.transfer(deployer, invalidAmount, {from: receiver}).should.be.rejectedWith(EVM_REVERT)
            })
            
            // 无效接受者,不能想0地址发送代币（不能销毁）
            it('rejects invalid receipients', async() => {
                await token.transfer(0x0, amount, {from: deployer}).should.be.rejectedWith('invalid address')
            })
        })
        ```

  - 测试后输出

    ```bash
    Compiling your contracts...
    ===========================
    > Compiling ./src/contracts/Token.sol
    > Compiling @openzeppelin/contracts/token/ERC20/IERC20.sol
    > Compiling @openzeppelin/contracts/utils/math/SafeMath.sol
    > Artifacts written to /var/folders/84/d1j8r9m90rggg4b5vrwhck_m0000gn/T/test--59871-VrC7wgcHIuj4
    > Compiled successfully using:
       - solc: 0.8.17+commit.8df45f5f.Emscripten.clang
       
      Contract: Token
        deployment
          ✔ tracks the name (77ms)
          ✔ tracks the symbol
          ✔ tracks the decimals (43ms)
          ✔ tracks the totalSupply (170ms)
          ✔ assigns the total supply to the deployer (116ms)
        sending tokens
          success
            ✔ transfers token balances (242ms)
            ✔ emits a transfer event
          failure
            ✔ rejects insufficient balances (3143ms)
            ✔ rejects invalid receipients
    
      9 passing (10s)
    ```

### 5.4 批准发送并测试

- 添加 Approval 批准事件

  ```solidity
  event Approval(address indexed owner, address indexed spender, uint value);
  ```

- 添加 approve 批准方法

  ```solidity
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
  ```

- 添加测试单元

  ```js
  // 批准发送代币
  describe('approving tokens', () => {
      let amount
      let result
  
      beforeEach(async () => {
          amount = tokens(100)
          result = await token.approve(exchange, amount, { from: deployer })
      })
  
      describe('success', () => {
          // 批准发送
          it('allocates an allowance for delegate token spending on exchange', async () => {
              const allowance = await token.allowance(deployer, exchange)
              allowance.toString().should.eq(amount.toString())
          })
  
          // 发送‘批准发送’事件
          it('emits an Approval event', async () => {
              const log = result.logs[0]
              log.event.should.eq('Approval')
              const event = log.args
              event.owner.toString().should.eq(deployer, 'owner is correct')
              event.spender.toString().should.eq(exchange, 'spender is correct')
              event.value.toString().should.eq(amount.toString(), 'value is correct')
          })
      })
  
      describe('failure', () => {
          // 无效接受者,不能想0地址发送代币（不能销毁）
          it('rejects invalid', async () => {
              await token.approve(0x0, amount, { from: deployer }).should.be.rejectedWith('invalid address')
          })
      })
  })
  ```

### 5.5 代理发送代币并测试

- 重构代码

  - 新建 __transfer()_ 函数，用于提取公共方法

    ```solidity
    /** 
     * name: 发送代币
     * desc: 把账户中的余额，由调用者发送到另一个账户中
     * param {address} _from 发送方
     * param {address} _to 接收方
     * param {uint} _value 数量
     */    
    function _transfer(address _from, address _to, uint _value) internal {
         // 不能向0地址发送
        require(_to != address(0), 'address is invalid');
         // 发送者减掉数量
        balanceOf[_from] = balanceOf[_from].sub(_value);
        // 接受者增加数量
        balanceOf[_to] = balanceOf[_to].add(_value);
        emit Transfer(_from, _to, _value);
    }
    ```

  - 更改 transfer() 函数

    ```solidity
    function transfer(address _to, uint _value) external returns (bool) {
        // 余额不足校验
        require(balanceOf[msg.sender] >= _value, 'insufficient balances');
        _transfer(msg.sender, _to, _value);      
        return true;
    }
    ```

  - 新建 transferFrom() 函数

    ```solidity
    /** 
     * name: transferFrom
     * desc: 向另一个合约存款的时候，另一个合约需要调用 transferFrom 把token拿到它的合约中
     * param {address} _from
     * param {address} _to
     * param {uint} _value
     * return {bool}
     */     
    function transferFrom(address _from, address _to, uint _value) external returns (bool) {
        // 小于等于拥有数量
        require(_value <= balanceOf[_from]);
        // 小于等于批准数量
        require(_value <= allowance[_from][msg.sender]);
        _transfer(_from, _to, _value);
        allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value);
        return true;
    }
    ```

- 添加测试单元

  ```js
  // 代理发送代币
  describe('delegated token transfers', () => {
      let amount
      let result
  
      beforeEach(async () => {
          amount = tokens(100)
          // 部署者先批准 100 个代币到交易所，然后由交易所调用 transferFrom 函数，发送至接收者
          await token.approve(exchange, amount, {from: deployer})
      })
  
      // 订阅测试成功
      describe('success', () => {
          beforeEach(async () => {
              amount = tokens(100)
              // Transfer
              result = await token.transferFrom(deployer, receiver, amount, { from: exchange })
          })
  
          // 发送代币余额
          it('transfers token balances', async () => {
              let balanceOf
  
              // After transfer
              balanceOf = await token.balanceOf(deployer)
              balanceOf.toString().should.equal(tokens(99999900).toString())
              balanceOf = await token.balanceOf(receiver)
              balanceOf.toString().should.equal(tokens(100).toString())
          })
  
          // 重置账单
          it('rests the allowance', async () => {
              const allowance = await token.allowance(deployer, exchange)
              allowance.toString().should.eq('0')
          })
  
          // 发送‘发送代币’事件
          it('emits a transfer event', async () => {
              const log = result.logs[0]
              log.event.should.eq('Transfer')
              const event = log.args
              event.from.toString().should.eq(deployer, 'from is correct')
              event.to.toString().should.eq(receiver, 'receiver is correct')
              event.value.toString().should.eq(amount.toString(), 'value is correct')
          })
      })
  
      // 订阅测试失败
      describe('failure', () => {
          // 余额不足测试
          it('rejects insufficient balances', async () => {
              let invalidAmount
              invalidAmount = tokens(10000000000) // greater than totalSupply
              await token.transferFrom(deployer, receiver, invalidAmount, { from: exchange }).should.be.rejectedWith(EVM_REVERT)
          })
  
          // 无效接受者,不能想0地址发送代币（不能销毁）
          it('rejects invalid receipients', async () => {
              await token.transferFrom(deployer, 0x0, amount, { from: exchange }).should.be.rejectedWith('invalid address')
          })
      })
  })
  ```

### 5.6 继承 IERC接口

- 引入 IERC20.sol

  ```solidity
  import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
  ```

- 修改代码

  ```solidity
  contract Token is IERC20 {}
  ```

  删除两个事件定义

  



## 6. Cryptocurrency Exchange Smart Contract

### 6.1 create smart contract

- 新增 Exchange.sol

  ```solidity
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
  ```

- 部署测试

  新增 Exchange.test.js

  ```js
  /**
   * @Author: GKing
   * @Date: 2022-11-19 10:54:40
   * @LastEditors: GKing
   * @LastEditTime: 2022-11-19 15:05:26
   * @Description: 
   * @TODO: 
   */
  import { tokens, EVM_REVERT } from './Helpers'
  
  const Token = artifacts.require('./Token')
  const Exchange = artifacts.require('./Exchange')
  
  require('chai')
      .use(require('chai-as-promised'))
      .should()
  
  // 合同函数
  contract('Exchange', ([deployer, feeAccount, user1]) => {
      let token
      let exchange
      const feePercent = 10
  
      beforeEach(async () => {
          // 部署代币合约
          token = await Token.new()
          // 发送代币
          token.transfer(user1, tokens(100), {from: deployer})
          // 部署交易所合约，通过构造函数传参
          exchange = await Exchange.new(feeAccount, feePercent)
          
      })
  
      // 单元测试部署
      describe('deployment', () => {
          // 跟踪 account
          it('tracks the fee account', async () => {
              const result = await exchange.feeAccount()
              result.should.eq(feeAccount)
          })
  
          // 跟踪 feePercent
          it('tracks the fee feePercent', async () => {
              const result = await exchange.feePercent()
              result.toString().should.eq(feePercent.toString())
          })
      })
  
  })
  ```

### 6.2 Deposit tokens

- depositToken function

  ```solidity
  /**
   * name: depositToken
   * desc: 存入代币
   * param {address} _token 代币地址
   * param {uint} _amount 数量
   * return {*}
   */
  function depositToken(address _token, uint _amount) public {
      // don't allow Ether deposits
      require(_token != ETHER);
      // 发送代币到本合约（交易所）
      require(Token(_token).transferFrom(msg.sender, address(this), _amount));
      // 管理存款 -> 更新余额
      tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount);
      // 发送事件
      emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
  }
  ```

- describe depositing tokens

  ```js
  // 存款单元测试
  describe('depositing tokens', () => {
      let result
      let amount
      
      describe('success', () => {
          beforeEach(async () => {
              amount = tokens(10)
              await token.approve(exchange.address, amount, { from: user1 })
              result = await exchange.depositToken(token.address, amount, { from: user1 })
          })
  
          it('tracks the token desposit', async () => {
              let balance
              // 校验token合约内，交易所下有多少代币
              balance = await token.balanceOf(exchange.address)
              balance.toString().should.eq(amount.toString())
              // 校验exchange合约内，用户有多少代币
              balance = await exchange.tokens(token.address, user1)
              balance.toString().should.eq(amount.toString())
          })
  
          // 发送'存款'事件
          it('emits a Deposit event', async () => {
              const log = result.logs[0]
              log.event.should.eq('Deposit')
              const event = log.args
              event.token.should.eq(token.address, 'token is correct')
              event.user.should.eq(user1, 'user is correct')
              event.amount.toString().should.eq(tokens(10).toString(), 'amount is correct')
              event.balance.toString().should.eq(tokens(10).toString(), 'balance is correct')
          })
  
      })
      
      describe('failure', () => {
          it('rejects Ehter deposits', async() => {
              await exchange.depositToken(ETHER_ADDRESS, tokens(10), {from: user1}).should.be.rejectedWith(EVM_REVERT)
          })
  
          it('fails when no tokens are approved', async () => {
              await exchange.depositToken(token.address, tokens(10), {from: user1}).should.be.rejectedWith(EVM_REVERT)
          })
  
      })
  })
  ```

### 6.3 Deposit Ether

- depositEther function

  ```solidity
  /** 
   * name: depositEther
   * desc: 给交易所空白地址发送eth
   * return {*}
   */
  function depositEther() payable public {
      tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].add(msg.value);
      emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
  }
  ```

- Describe depositing Ether

  ```js
  // 存款eth
  describe('depositing ehters', async () => {
      let amount
      let result
  
      beforeEach(async () => {
          amount = ethers(1)
          result = await exchange.depositEther({from: user1, value: amount})
      })
      it('tracks ether deposits', async () => {
          const balance = await exchange.tokens(ETHER_ADDRESS, user1)
          balance.toString().should.eq(amount.toString())
      })
  
      // 发送'存款'事件
      it('emits a Deposit ether event', async () => {
          const log = result.logs[0]
          log.event.should.eq('Deposit')
          const event = log.args
          event.token.should.eq(ETHER_ADDRESS, 'ether address is correct')
          event.user.should.eq(user1, 'user is correct')
          event.amount.toString().should.eq(amount.toString(), 'amount is correct')
          event.balance.toString().should.eq(amount.toString(), 'balance is correct')
      })
  })
  ```

### 6.4 Withdraw Ethers

- withdrawEthers function

  ```solidity
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
  ```

- Describe withdrawing Ethers

  ```js
  // withdraw Ethers test
  describe('withdrawing Ethers', async () => {
      let result
      let amount
  
      beforeEach(async () => {
          amount = ethers(1)
          // Deposit Ethers first
          await exchange.depositEther({from: user1, value:amount})
      })
  
      describe('success', async () => {
          beforeEach(async () => {
              // withdraw Ether
              result = await exchange.withdrawEthers(amount, {from: user1})
          })
  
          it('withdraw Ether funds', async () => {
              const balance = await exchange.tokens(ETHER_ADDRESS, user1)
              balance.toString().should.eq('0')
          })
  
          // 发送'存款'事件
          it('emits a "Withdraw" ether event', async () => {
              const log = result.logs[0]
              log.event.should.eq('Withdraw')
              const event = log.args
              event.token.should.eq(ETHER_ADDRESS, 'ether address is correct')
              event.user.should.eq(user1, 'user is correct')
              event.amount.toString().should.eq(amount.toString(), 'amount is correct')
              event.balance.toString().should.eq('0', 'balance is correct')
          })
      })
  
      describe('failure', async () => {
          it('rejects withdraw for insufficient balances', async () => {
              await exchange.withdrawEthers(ethers(1000), {from: user1}).should.be.rejectedWith(EVM_REVERT)
          })
      })
  })
  ```

### 6.5 Withdraw tokens

- withdrawTokens function

  ```solidity
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
  ```

- Describe withdrawing tokens

  ```js
  // withdraw Ethers test
  describe('withdrawing tokens', async () => {
      let result
      let amount
  
      beforeEach(async () => {
          amount = tokens(10)
          // Approve tokens
          await token.approve(exchange.address, amount, {from: user1})
          // Deposit tokens
          await exchange.depositToken(token.address, amount, {from: user1})
      })
  
      describe('success', async () => {
          beforeEach(async () => {
              // Withdraw tokens
              result = await exchange.withdrawTokens(token.address, amount, {from: user1})
          })
  
          it('withdraw tokens funds', async () => {
              const balance = await exchange.tokens(token.address, user1)
              balance.toString().should.eq('0')
          })
  
          // 发送'存款'事件
          it('emits a "Withdraw" tokens event', async () => {
              const log = result.logs[0]
              log.event.should.eq('Withdraw')
              const event = log.args
              event.token.should.eq(token.address, 'ether address is correct')
              event.user.should.eq(user1, 'user is correct')
              event.amount.toString().should.eq(amount.toString(), 'amount is correct')
              event.balance.toString().should.eq('0', 'balance is correct')
          })
      })
  
      describe('failure', async () => {
          it('rejects withdraw for insufficient balances', async () => {
              await exchange.withdrawTokens(token.address, tokens(1000), {from: user1}).should.be.rejectedWith(EVM_REVERT)
          })
          it('rejects Ethers withdraw', async () => {
              await exchange.withdrawTokens(ETHER_ADDRESS, tokens(1000), {from: user1}).should.be.rejectedWith(EVM_REVERT)
          })
          
      })
      
  })
  ```

### 6.6 Check user balance

- balanceOf function

  ```solidity
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
  ```

- Describe balanceOf

  ```js
  describe('check balanceOf', async () => {
      beforeEach(async () => {
          await exchange.depositEther({from: user1, value: ethers(1)})
      })
  
      it('tracks user balance', async() => {
          const result = await exchange.balanceOf(ETHER_ADDRESS, user1)
          result.toString().should.eq(ethers(1).toString())
      })
  })
  ```

### 6.7 Create orders

- order model

  ```solidity
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
  ```

- Order event

  ```solidity
  event Order (
      uint id,
      address userAdr,
      address tokenGetAdr,
      uint amountGet,
      address tokenGiveAdr,
      uint amountGive,
      uint timestamp
  );
  ```

- createOrder function

  ```solidity
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
  ```

- Describe create order and emit "Order" event

  ```js
  describe('making orders', async () => {
      let result
      let amountToken
      let amountEth
      
      beforeEach(async () => {
          amountToken = tokens(1)
          amountEth = ethers(1)
  
          result = await exchange.createOrder(token.address, amountToken, ETHER_ADDRESS, amountEth, {from: user1})
      })
  
      it('tracks the new order', async() => {
          const orderCount = await exchange.orderCount()
          orderCount.toString().should.eq('1')
          const order = await exchange.orders(orderCount.toString())
          order.id.toString().should.eq('1')
          order.userAdr.should.eq(user1, 'userAdr is correct')
          order.tokenGetAdr.should.eq(token.address, 'tokenGetAdr is correct')
          order.amountGet.toString().should.eq(amountToken.toString(), 'amountGet is correct')
          order.tokenGiveAdr.toString().should.eq(ETHER_ADDRESS, 'tokenGiveAdr is correct')
          order.amountGive.toString().should.eq(amountEth.toString(), 'amountGive is correct')
          order.timestamp.toString().length.should.be.at.least(1, 'timestamp is correct')
      })
  
      it('emit an "Order" event', async() => {
          const log = result.logs[0]
          log.event.should.eq('Order')
          const event = log.args
          event.id.toString().should.eq('1')
          event.userAdr.should.eq(user1, 'userAdr is correct')
          event.tokenGetAdr.should.eq(token.address, 'tokenGetAdr is correct')
          event.amountGet.toString().should.eq(amountToken.toString(), 'amountGet is correct')
          event.tokenGiveAdr.toString().should.eq(ETHER_ADDRESS, 'tokenGiveAdr is correct')
          event.amountGive.toString().should.eq(amountEth.toString(), 'amountGive is correct')
          event.timestamp.toString().length.should.be.at.least(1, 'timestamp is correct')
      })
  })
  ```

### 6.8 Cancel orders

- Cancelled order mapping

  ```solidity
  mapping(uint => bool) public ordersCancelled;
  ```

- Cancel event

  ```solidity
  event Cancel (
      uint id,
      address userAdr,
      address tokenGetAdr,
      uint amountGet,
      address tokenGiveAdr,
      uint amountGive,
      uint timestamp
  );
  ```

- cancelOrder function

  ```solidity
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
  ```

- Describe cancelling orders

  ```js
  describe('cancelling order', async () => {
      let result
  
      describe('success', async () => {
          beforeEach(async () => {
              result = await exchange.cancelOrder(1, {from: user1})
          })
          it('update cancelled order', async () => {
              const orderCancelled = await exchange.ordersCancelled(1)
              orderCancelled.should.eq(true)
          })
          it('emit an "Cancel" event', async() => {
              const log = result.logs[0]
              log.event.should.eq('Cancel')
              const event = log.args
              event.id.toString().should.eq('1', 'id is correct')
              event.userAdr.should.eq(user1, 'userAdr is correct')
              event.tokenGetAdr.should.eq(token.address, 'tokenGetAdr is correct')
              event.amountGet.toString().should.eq(amountToken.toString(), 'amountGet is correct')
              event.tokenGiveAdr.toString().should.eq(ETHER_ADDRESS, 'tokenGiveAdr is correct')
              event.amountGive.toString().should.eq(amountEth.toString(), 'amountGive is correct')
              event.timestamp.toString().length.should.be.at.least(1, 'timestamp is correct')
          })
          
  
      })
      describe('failure', async () => {
          it('tacks invalid id', async () => {
              const invalidId = 9999
              await exchange.cancelOrder(invalidId, {from: user1}).should.be.rejectedWith(EVM_REVERT)
          })
          it('tacks other user cancel my order', async () => {
              await exchange.cancelOrder(1, {from: user2}).should.be.rejectedWith(EVM_REVERT)
          })
          
      })
  })
  ```

### 6.9 Fill orders

- Filled orders mapping

  ```solidity
  mapping(uint => bool) public ordersFilled;
  ```

- Trade event

  ```solidity
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
  ```

- fillOrder function

  ```solidity
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
  ```

- Describe fill orders

  ```js
  describe('order actions', async () => {
      let amountToken
      let amountEth
  
      beforeEach(async () => {
          amountToken = tokens(1)
          amountEth = ethers(1)
          // user1 deposits ether only
          await exchange.depositEther({from: user1, value: amountEth})
          // give token to user2
          await token.transfer(user2, tokens(100), {from: deployer})
          // user2 deposit tokens only
          await token.approve(exchange.address, tokens(2), {from: user2})
          await exchange.depositToken(token.address, tokens(2), {from: user2})
          // user1 makes an order to buy tokens with Ether
          await exchange.createOrder(token.address, amountToken, ETHER_ADDRESS, amountEth, {from: user1})
      })
  
      describe('filling order', async () => {
          let result
          describe('success', async () => {
              beforeEach(async () => {
                  // user2 fills order
                  result = await exchange.fillOrder(1, {from: user2})
              })
  
              it('executes the trade & charge fees', async () => {
                  let balance
                  balance = await exchange.balanceOf(token.address, user1)
                  balance.toString().should.eq(amountToken.toString(), 'user1 received tokens')
                  balance = await exchange.balanceOf(ETHER_ADDRESS, user2)
                  balance.toString().should.eq(amountEth.toString(), 'user2 received Ether')
                  balance = await exchange.balanceOf(ETHER_ADDRESS, user1)
                  balance.toString().should.eq('0', 'user1 usee 1 Ether, has no Ether')
                  balance = await exchange.balanceOf(token.address, user2)
                  balance.toString().should.eq(tokens(0.9).toString(), 'user2 tokens deducted with fee applied')
                  const feeAccount = await exchange.feeAccount()
                  balance = await exchange.balanceOf(token.address, feeAccount)
                  balance.toString().should.eq(tokens(0.1).toString(), 'feeAccount received fee')
              })
  
              it('update filled order', async () => {
                  const orderFilled = await exchange.ordersFilled(1)
                  orderFilled.should.eq(true)
              })
  
              it('emit an "Trade" event', async() => {
                  const log = result.logs[0]
                  log.event.should.eq('Trade')
                  const event = log.args
                  event.id.toString().should.eq('1', 'id is correct')
                  event.userAdr.should.eq(user1, 'userAdr is correct')
                  event.tokenGetAdr.should.eq(token.address, 'tokenGetAdr is correct')
                  event.amountGet.toString().should.eq(amountToken.toString(), 'amountGet is correct')
                  event.tokenGiveAdr.should.eq(ETHER_ADDRESS, 'tokenGiveAdr is correct')
                  event.amountGive.toString().should.eq(amountEth.toString(), 'amountGive is correct')
                  event.userFillAdr.should.eq(user2, 'userFillAdr is correct')
                  event.timestamp.toString().length.should.be.at.least(1, 'timestamp is correct')
              })
  
          })
          describe('failure', async () => {
              it('reject invalid id', async () => {
                  const invalidId = 9999
                  await exchange.cancelOrder(invalidId, {from: user2}).should.be.rejectedWith(EVM_REVERT)
              })
  
              it('reject already filled order', async () => {
                  // Fill the order
                  await exchange.fillOrder(1, {from: user2}).should.be.fulfilled
                  // Try to file again
                  await exchange.fillOrder(1, {from: user2}).should.be.rejectedWith(EVM_REVERT)
              })
  
              it('reject cancelled order', async () => {
                  // Cancel the order
                  await exchange.cancelOrder(1, {from: user1}).should.be.fulfilled
                  // Try to fill the order
                  await exchange.fillOrder(1, {from: user2}).should.be.rejectedWith(EVM_REVERT)
              })
  
          })
      })
  
      describe('cancelling order', async () => {
          let result
  
          describe('success', async () => {
              beforeEach(async () => {
                  result = await exchange.cancelOrder(1, {from: user1})
              })
              it('update cancelled order', async () => {
                  const orderCancelled = await exchange.ordersCancelled(1)
                  orderCancelled.should.eq(true)
              })
              it('emit an "Cancel" event', async() => {
                  const log = result.logs[0]
                  log.event.should.eq('Cancel')
                  const event = log.args
                  event.id.toString().should.eq('1', 'id is correct')
                  event.userAdr.should.eq(user1, 'userAdr is correct')
                  event.tokenGetAdr.should.eq(token.address, 'tokenGetAdr is correct')
                  event.amountGet.toString().should.eq(amountToken.toString(), 'amountGet is correct')
                  event.tokenGiveAdr.should.eq(ETHER_ADDRESS, 'tokenGiveAdr is correct')
                  event.amountGive.toString().should.eq(amountEth.toString(), 'amountGive is correct')
                  event.timestamp.toString().length.should.be.at.least(1, 'timestamp is correct')
              })
              
  
          })
          describe('failure', async () => {
              it('reject invalid id', async () => {
                  const invalidId = 9999
                  await exchange.cancelOrder(invalidId, {from: user1}).should.be.rejectedWith(EVM_REVERT)
              })
              it('reject other user cancel my order', async () => {
                  await exchange.cancelOrder(1, {from: user2}).should.be.rejectedWith(EVM_REVERT)
              })
              
          })
      })
  })
  ```

  

### 6.10 All test output

```bash
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./src/contracts/Exchange.sol
> Compiling ./src/contracts/Token.sol
> Compiling @openzeppelin/contracts/token/ERC20/IERC20.sol
> Compiling @openzeppelin/contracts/utils/math/SafeMath.sol
> Artifacts written to /var/folders/84/d1j8r9m90rggg4b5vrwhck_m0000gn/T/test--76618-aougZTkMAEDU
> Compiled successfully using:
   - solc: 0.8.17+commit.8df45f5f.Emscripten.clang


  Contract: Exchange
    deployment
      ✔ tracks the fee account (112ms)
      ✔ tracks the fee feePercent (101ms)
    fallback
      ✔ revert when ether is sent (778ms)
    depositing ehters
      ✔ tracks ether deposits (111ms)
      ✔ emits a Deposit ether event
    depositing tokens
      success
        ✔ tracks the token desposit (93ms)
        ✔ emits a "Deposit" event
      failure
        ✔ rejects Ehter deposits (59ms)
        ✔ fails when no tokens are approved (40ms)
    withdrawing Ethers
      success
        ✔ withdraw Ether funds
        ✔ emits a "Withdraw" ether event
      failure
        ✔ rejects withdraw for insufficient balances (159ms)
    withdrawing tokens
      success
        ✔ withdraw tokens funds (55ms)
        ✔ emits a "Withdraw" tokens event
      failure
        ✔ rejects withdraw for insufficient balances (296ms)
        ✔ rejects Ethers withdraw (119ms)
    check balance
      ✔ tracks user balance (68ms)
    making orders
      ✔ tracks the new order (153ms)
      ✔ emit an "Order" event
    order actions
      filling order
        success
          ✔ executes the trade & charge fees (255ms)
          ✔ update filled order (41ms)
          ✔ emit an "Trade" event
        failure
          ✔ reject invalid id (67ms)
          ✔ reject already filled order (683ms)
          ✔ reject cancelled order (240ms)
      cancelling order
        success
          ✔ update cancelled order
          ✔ emit an "Cancel" event
        failure
          ✔ reject invalid id (157ms)
          ✔ reject other user cancel my order (213ms)


  29 passing (58s)
```

