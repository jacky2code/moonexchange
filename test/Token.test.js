/**
 * Author: GKing
 * Date: 2022-11-15 22:19:58
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-18 22:08:31
 * Description: 
 */
import { tokens, EVM_REVERT } from './Helpers'

const Token = artifacts.require('./Token')

require('chai')
    .use(require('chai-as-promised'))
    .should()


// 合同函数
contract('Token', ([deployer, receiver, exchange]) => {
    const name = 'KaspaMoon'
    const symbol = 'KSMN'
    const decimals = '18'
    const totalSupply = tokens(100000000).toString()
    let token

    beforeEach(async () => {
        token = await Token.new()
    })

    // 单元测试部署
    describe('deployment', () => {
        // 跟踪 name
        it('tracks the name', async () => {
            const result = await token.name()
            result.should.equal(name)
        })
        // 跟踪 symbol
        it('tracks the symbol', async () => {
            const result = await token.symbol()
            result.should.equal(symbol)
        })
        // 跟踪 decimals
        it('tracks the decimals', async () => {
            const result = await token.decimals()
            result.toString().should.equal(decimals)
        })
        // 跟踪 totalSupply
        it('tracks the totalSupply', async () => {
            const result = await token.totalSupply()
            result.toString().should.equal(totalSupply.toString())
        })
        // 分配总量给部署者
        it('assigns the total supply to the deployer', async () => {
            const result = await token.balanceOf(deployer)
            result.toString().should.equal(totalSupply.toString())
        })
    })

    // 发送代币
    describe('sending tokens', () => {
        let amount
        let result

        // 订阅测试成功
        describe('success', () => {
            beforeEach(async () => {
                amount = tokens(100)
                // Transfer
                result = await token.transfer(receiver, amount, { from: deployer })
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
                await token.transfer(receiver, invalidAmount, { from: deployer }).should.be.rejectedWith(EVM_REVERT)

                invalidAmount = tokens(10)
                // receiver has no tokens
                await token.transfer(deployer, invalidAmount, { from: receiver }).should.be.rejectedWith(EVM_REVERT)
            })

            // 无效接受者,不能想0地址发送代币（不能销毁）
            it('rejects invalid receipients', async () => {
                await token.transfer(0x0, amount, { from: deployer }).should.be.rejectedWith('invalid address')
            })
        })
    })

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

    // 代理发送代币
    describe('delegated token transfers', () => {
        let amount
        let result

        beforeEach(async () => {
            amount = tokens(100)
            // 部署者先批准 100 个代币到交易所，然后由交易所调用 transferFrom 函数，发送至接收者
            await token.approve(exchange, amount, { from: deployer })
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
})