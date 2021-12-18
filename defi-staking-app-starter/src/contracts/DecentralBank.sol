pragma solidity ^0.5.0;
import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;

    Tether public tether;
    RWD public rwd;

    address[] public stackers;

    mapping(address => uint) public stackingBalance;
    mapping(address => bool) public hasStacked;
    mapping(address => bool) public isStacked;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
    }

    // stacking function
    function depositTokens(uint _amount) public {
        // require stacking amount to be greater than zero
        require(_amount > 0, 'amount cannot be 0');
        
        //Transfer tether tokens to this contract address for stacking
        tether.transferFrom(msg.sender, address(this), amount);
        
        // Update Stacking Balance
        stackingBalance(msg.sender) = stackingBalance(msg.sender) + _amount;

        if(!hasStacked) {
            stackers.push(msg.sender);
        }

        //Update Stacking Balance
        isStacked[msg.sender] = true;
        hasStacked[msg.sender] = true;
    }
}