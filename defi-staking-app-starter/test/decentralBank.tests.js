const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', ([owner, customer]) => {
    //All of the code goes here for testing
    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    let tether, rwd, decentralBank;

    before(async () => {
        //Load Contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)
        
        //Transfer all tokens to the bank
        await rwd.transfer(decentralBank.address, tokens('1000000'))

        //Transfer 100 mock Tethers to Customer
        await tether.transfer(customer, tokens('100'), {from: owner})
    })

    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name()
            assert.equal(name, 'Mock Tether Token')
        })
    })

    describe('RWD Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name()
            assert.equal(name, 'Reward Token')
        })
    })

    describe('Decentral Bank Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })

        it('there are tokens', async () => {
            balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })
    })

    describe('Yield Farming', async () => {
        it('rewards tokens for stacking', async () => {
            let result

            // Check Investor Balance
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance before stacking')
            
            // Check Stacking For Customer
            await tether.approve(decentralBank.address, tokens('100'), {from: customer})
            await decentralBank.depositTokens(tokens('100'), {from: customer})

            // Check Updated Balance of Customer
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'), 'customer updated balance')

            // Check Updated Balance of Decentral Bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('100'), 'decentral bank mock wallet after stacking from customer')

            //Is Stacking Balance
            result = await decentralBank.isStacking(customer)
            assert.equal(result.toString(), 'true', "customer stacking status after stacking done")


            // Issue Tokens
            await decentralBank.issueTokens({from: owner})

            // Ensure it's only by owner
            await decentralBank.issueTokens({from: customer}).should.be.rejected;
        })        
    })

    

})