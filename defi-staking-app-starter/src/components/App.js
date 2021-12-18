import React, {Component} from 'react'
import './App.css'
import Navbar from './Navbar';

class App extends Component {
    // Our react code goes here
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0'
        }
    }

    render() {
        return (
            <div>
                <Navbar account={this.state.account}/>
                <div className="text-center">
                    <h>hello world</h>
                </div>
            </div>
            
        )
    }
}

export default App;