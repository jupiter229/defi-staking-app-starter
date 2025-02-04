import React, {Component} from 'react'
import bank from '../bank.png';

class Navbar extends Component {
    // Our react code goes here
    render() {
        return (
           <nav className='navbar navbar-dark fixed-top shadow p-0' style={{backgroundColor: 'black', height: '50px'}}>
               <a style={{color: 'white'}}>
                <img src={bank} width='50' height='30' className='d-inline-block align-top'/>
                &nbsp; DAPP Yield Stacking(DEX Banking) 
                
               </a>
               <ul className='navbar-nav px-3'>
                   <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
                       <small style={{color:'white'}}>Account Number: {this.props.account}</small>
                   </li>
               </ul>
           </nav>
        )
    }
}

export default Navbar;