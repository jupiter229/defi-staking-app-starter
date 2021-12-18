import React, {Component} from 'react'
import './App.css'
import Navbar from './Navbar';

class App extends Component {
    // Our react code goes here
    render() {
        return (
            <div>
                <Navbar/>
                <div className="text-center">
                    <h>hello world</h>
                </div>
            </div>
            
        )
    }
}

export default App;