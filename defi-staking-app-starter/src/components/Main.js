import React, {Component} from 'react'
import tether from '../tether.png';

class Main extends Component {
    // Our react code goes here
    render() {
        return (
            <div id="content" className='mt-3'>
                <table className='table text-muted text-center'>
                    <thead>
                        <tr  style={{color: 'blank'}}>
                            <th scope="col">Staking Balance</th>
                            <th scope="col">Reward Balance</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr style={{color: 'blank'}}>
                            <td>USDT</td>
                            <td>RWD</td>
                        </tr>
                    </tbody>
                </table>
                <div className="card mb-2" style={{opacity: '.9'}}>
                    <form className='mb-3'>
                        <div style={{borderSpacing: '0 1em'}}>
                            <label className='float-left' style={{marginLeft: '15px'}}>
                                <b>Stake Token</b>
                            </label>
                            <span className="float-right" style={{marginRight: '8px'}}>
                                Balance:
                            </span>
                            <div className="input-group mb-4">
                                <input
                                type="text"
                                placeholder="0"
                                required />

                                <div className="input-group-open">
                                    <div className='input-group-text'>
                                        <img alt='tether' src={tether} height="32px"/>
                                        &nbsp;&nbsp;&nbsp;USDT
                                    </div>
                                </div>
                            </div>

                            <button className='btn btn-primary btn-lg btn-block' type='submit'>DEPOSIT</button>
                    
                        </div>
                    </form>
                    <button className='btn btn-primary btn-lg btn-block'>WITHDRAW</button>
                    <div className='card-body text-center' style={{color: 'blue'}}>
                        AIRDROP
                    </div>
                </div>
            </div>
        )
    }
}
export default Main