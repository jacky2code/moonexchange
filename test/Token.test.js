/**
 * @Author: Jacky Chang
 * @Date: 2022-11-16 12:04:15
 * @LastEditors: Jacky Chang
 * @LastEditTime: 2022-11-18 16:33:08
 * @Description: 
 */
import { tokens, EVM_REVERT } from './Helpers'

const Token = artifacts.require('./Token')

require('chai')
    .use(require('chai-as-promised'))
    .should()


// 合同函数
contract('Token', ([deployer, receiver]) => {
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
                result = await token.transfer(receiver, amount, {from: deployer})
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
        


    })

})