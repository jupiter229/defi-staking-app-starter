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
    mapping(address => bool) public isStacking;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // stacking function
    function depositTokens(uint _amount) public {
        // require stacking amount to be greater than zero
        require(_amount > 0, 'amount cannot be 0');

        //Transfer tether tokens to this contract address for stacking
        tether.transferFrom(msg.sender, address(this), _amount);
        
        // Update Stacking Balance
        stackingBalance[msg.sender] = stackingBalance[msg.sender] + _amount;

        if(!hasStacked[msg.sender]) {
            stackers.push(msg.sender);
        }

        //Update Stacking Balance
        isStacking[msg.sender] = true;
        hasStacked[msg.sender] = true;
    }


    // issue rewards
    function issueTokens() public {
        //require the onwer to issue tokens only
        require(msg.sender == owner, 'caller must be the owner');

        for (uint i = 0; i < stackers.length; i ++) {
            address recipient = stackers[i];
            uint balance = stackingBalance[recipient] / 9; // 9 to create percentage incentive for stackers
            if(balance > 0) {
                rwd.transfer(recipient, balance);
            }
            
        }
    }
}