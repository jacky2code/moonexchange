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

## 5. 智能合约测试

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

### 5.3 代币转移

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

    
