/**
 * @Author: GKing
 * @Date: 2022-11-19 10:54:40
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-21 17:22:30
 * @Description: 
 * @TODO: 
 */
import {ethers, tokens, EVM_REVERT, ETHER_ADDRESS } from './Helpers'

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
        token.transfer(user1, tokens(100), { from: deployer })
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

    describe('fallback', () => {
        it('revert when ether is sent', async () => {
            await exchange.sendTransaction({value: 1, from: user1}).should.be.rejectedWith(EVM_REVERT)
        })
    })

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
})