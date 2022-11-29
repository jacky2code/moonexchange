
/**
 * @Author: GKing
 * @Date: 2022-11-23 10:19:23
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-29 11:38:12
 * @Description: fill Exchange orders or other datas
 * @TODO: 
 */


const Token = artifacts.require('Token');
const Exchange = artifacts.require('Exchange');

const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

// wei转换bigNumber
const ethers = (n) => {
    return new web3.utils.toBN(
        web3.utils.toWei(n.toString(), 'ether')
    )
}

const tokens = (n) => ethers(n)

const wait = (seconds) => {
    const millseconds = seconds * 1000;
    return new Promise(resolve => setTimeout(resolve, millseconds))
}


module.exports = async function(callback) {

    try {
        console.log('script "seed-exchange" is running ...');

        // Fetch account from wallet
        const accounts = await web3.eth.getAccounts();
        console.log('Accounts fetched length :', accounts.length)

        // Fetch the deployed token
        const token = await Token.deployed();
        console.log('Token fetched :', token.address);

        // Fetch the deployed exchange
        const exchange = await Exchange.deployed();
        console.log('Exchange fetched :', exchange.address)

        // Give tokens to accounts[1]
        const sender = accounts[0];
        const receiver = accounts[1];
        // 10,000 tokens
        let amount = tokens(10000);

        await token.transfer(receiver, amount, {from: sender});
        console.log(`Transferred ${ amount } tokens from ${ sender } to ${ receiver }`);

        // Set up exchange users
        const user1 = accounts[0];
        const user2 = accounts[1];

        // User1 deposits Ether
        amount = 1;
        await exchange.depositEther({from: user1, value: ethers(amount)})

        // User2 approves tokens
        amount = 10000;
        await token.approve(exchange.address, tokens(amount), {from: user2});
        console.log(`Approved ${amount} tokens from ${user2}`);

        // User2 deposits tokens
        await exchange.depositToken(token.address, tokens(amount), {from: user2});
        console.log(`Deposited ${amount} tokens from ${user2}`);



        // Seed a Cancelled order
        // User1 makes order to get tokens
        let result;
        let orderId;
        result = await exchange.createOrder(token.address, tokens(100), ETHER_ADDRESS, ethers(0.1), {from: user1});
        console.log(`Made order from ${user1}`);

        // User1 cancels order
        orderId = result.logs[0].args.id;
        await exchange.cancelOrder(orderId, {from: user1});
        console.log(`Cancelled order from ${user1}`);



        // Seed filled orders
        // User1 makes order
        result = await exchange.createOrder(token.address, tokens(100), ETHER_ADDRESS, ethers(0.1), {from: user1});
        console.log(`Made order from ${user1}`);

        // User2 fills order
        orderId = result.logs[0].args.id;
        await exchange.fillOrder(orderId, {from: user2});
        console.log(`Filled order form ${user2}`);

        // Wait 1 second
        await wait(1);

        // User1 make another order
        result = await exchange.createOrder(token.address, tokens(50), ETHER_ADDRESS, ethers(0.01), {from: user1});
        console.log(`Made another order from ${user1}`);

        // User2 fills another order
        orderId = result.logs[0].args.id;
        await exchange.fillOrder(orderId, {from: user2});
        console.log(`Filled order form ${user2}`);

        // Wait 1 second
        await wait(1);

        // User1 make final order
        result = await exchange.createOrder(token.address, tokens(200), ETHER_ADDRESS, ethers(0.15), {from: user1});
        console.log(`Made another order from ${user1}`);

        // User2 fills final order
        orderId = result.logs[0].args.id;
        await exchange.fillOrder(orderId, {from: user2});
        console.log(`Filled order form ${user2}`);

        // Wait 1 second
        await wait(1);



        // Seed open orders
        // User1 makes 10 orders
        for (let i = 1; i < 10; i++) {
            result = await exchange.createOrder(token.address, tokens(10 * i), ETHER_ADDRESS, ethers(0.01), {from: user1});
            console.log(`Made order from ${user1}`);
            await wait(1);
        }
        
        // User2 makes 10 orders
        for (let i = 1; i < 10; i++) {
            result = await exchange.createOrder(ETHER_ADDRESS, ethers(0.01), token.address, tokens(10 * i), {from: user2});
            console.log(`Made order from ${user2}`);
            await wait(1);
        }


    } catch (error) {
        console.log(error);
    }

    callback();
}