pragma solidity ^0.5.0;

contract RWD {
    string public name = 'Reward Token';
    string symbol = 'RWD';
    uint256 public totalSuppy = 1000000000000000000; // 1 million tokens;
    uint decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval (
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256))  public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value ) public returns (bool success) {
        // require that the value is greater or equal for transfer
        require(balanceOf[msg.sender] >= _value);
        // transfer the amount and sub the balance from owner
        balanceOf[msg.sender] -= _value;
        // add the balance
        balacneOf[_to] += value;
        emit Transfer(msg.sender, _to, _value);
        return;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint2256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_to] += _value;

        balanceOf[_from] -= _value;
        allowance[from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}