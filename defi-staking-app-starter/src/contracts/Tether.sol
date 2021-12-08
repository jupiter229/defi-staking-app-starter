pragma solidity ^0.5.0;

contract Tether {
    string public name = 'Mock Tether Token';
    string symbol = 'USDT';
    uint256 public totalSuppy = 1000000000000000000; // 1 million tokens;
    uint decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    )

    event Approve (
        address indexed _owner,
        address indexed _spended,
        uint _value
    
    );

    mapping(address => uint256) public balanceOf;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value ) public returns (bool success) {
        // require that the value is greater or equal for transfer
        require(balanceOf[msg.sender] > = _value);
        // transfer the amount and sub the balance from owner
        balanceOf[msg.sender] -= _value;
        // add the balance
        balacneOf[_to] += value;
        emit Transfer(_from, _to, _value);
        return;
    }
}