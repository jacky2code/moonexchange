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

    // 存款单元测试
    describe('despositing tokens', () => {
        let result
        let amount
        beforeEach(async () => {
            amount = tokens(10)
            await token.approve(exchange.address, amount, {from: user1})
            const result = await exchange.despositToken(token.address, amount, {from: user1})
        })
        describe('success', ()=> {
            it('tracks the token desposit', async () => {
                let balance
                // 校验token合约内，交易所下有多少代币
                balance = await token.balanceOf(exchange.address)
                balance.toString().should.eq(amount.toString())
                // 校验exchange合约内，用户有多少代币
                balance = await exchange.tokens(token.address, user1)
                balance.toString().should.eq(amount.toString())
            })

        })
        describe('failure', () => {
            
        })
    })
})