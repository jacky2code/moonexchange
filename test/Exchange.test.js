/**
 * @Author: GKing
 * @Date: 2022-11-19 10:54:40
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-22 14:17:35
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
contract('Exchange', ([deployer, feeAccount, user1, user2]) => {
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

    // deployment test
    describe('deployment', () => {
        // 跟踪 account
        it('tracks the fee account', async () => {
            const result = await exchange.feeAccount()
            result.toString().should.eq(feeAccount.toString())
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

    // deposit Ehter test
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

    // deposit tokens test
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
            it('emits a "Deposit" event', async () => {
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

    describe('check balance', async () => {
        beforeEach(async () => {
            await exchange.depositEther({from: user1, value: ethers(1)})
        })

        it('tracks user balance', async() => {
            const result = await exchange.balanceOf(ETHER_ADDRESS, user1)
            result.toString().should.eq(ethers(1).toString())
        })
    })

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

})