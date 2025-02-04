import React, {Component} from 'react'
import './App.css'
import Navbar from './Navbar';
import Main from './Main';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import { send } from 'process';

class App extends Component {
    // Our react code goes here

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }else{
            window.alert('No ethereum browser detected! Checkout MetaMask!');
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        this.setState({
            account: account[0]
        })
        const networkId = await web3.eth.net.getId();

        // Load Tether data
        const tetherData = Tether.networks[networkId];
        if(tetherData){
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({tether: tether})
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString()})

            console.log("tetherBalance ", tetherBalance)
        } else{
            window.alert("Error! Tether contract not deployed - no detected network!");
        }

        // Load RWD data
        const rwdData = RWD.networks[networkId];
        if(rwdData){
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
            this.setState({rwd: rwd})
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString()})

            console.log("rwdBalance ", rwdBalance)
        } else{
            window.alert("Error! RWD contract not deployed - no detected network!");
        }

        // Load Decentral Bank data
        const decentralBankData = DecentralBank.networks[networkId];
        if(decentralBankData){
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            this.setState({decentralBank: decentralBank})
            let stackingBalance = await decentralBank.methods.stackingBalance(this.state.account).call()
            this.setState({stackingBalancev: stackingBalance.toString()})

            console.log("stackingBalance ", stackingBalance)
        } else{
            window.alert("Error! Decentral Bank contract not deployed - no detected network!");
        }

        console.log("networkId ", networkId)
        console.log('account ', account);
        this.setState({loading: false})
    }

    //stake Tokens
    stakeTokens = (amount) => {
        this.setState({loading: true})
        this.state.tether.methods.approve(this.state.decentralBank._address, amount)
        this.state.decentralBank.methods.depositTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loading: false})
        })
    }

    //unStake Tokens
    unStakeTokens = (amount) => {
        this.setState({loading: true})
        this.state.decentralBank.methods.unStakeTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loading: false})
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stackingBalance: '0',
            loading: true
        }
    }

    render() {
        let content
        {this.state.loading ? content =
            <p id="loading" className='text-center' style={{margin: '30px'}}>LOADING...</p> : 
            content = 
            <Main
            tetherBalance={this.state.tetherBalance}
            rwdBalance={this.state.rwdBalance}
            stackingBalance={this.state.stackingBalance}
            stakeTokens={this.stakeTokens}
            unStakeTokens={this.unStakeTokens}
            />
        }
        return (
            <div>
                <Navbar account={this.state.account}/>
                <div className='container-fluid mt-5'>
                    <div className='row'>
                        <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth: '600px', minHeight: '100vm' }}>
                            <div>
                                {content}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default App;