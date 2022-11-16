/**
 * @Author: Jacky Chang
 * @Date: 2022-11-16 12:04:15
 * @LastEditors: Jacky Chang
 * @LastEditTime: 2022-11-16 15:17:14
 * @Description: 
 */
const Token = artifacts.require('./Token')
require('chai')
    .use(require('chai-as-promised'))
    .should()

// 合同函数
contract('Token', (accounts) => {
    const name = 'KaspaMoon'
    const symbol = 'KSMN'
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