// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoPirateToken {
    string public name = "CryptoPirate";
    string public symbol = "CP";
    string public standard = "CP_v1.0";
    uint256 public totalSupply;
    uint256 public _transactionId;

    address public owner;

    address[] public holderToken;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _approvedUser,
        uint256 _value
    );

    struct TokenHolderInfo {
        uint256 _tokenId;
        address _from;
        address _to;
        uint256 _totalSupply;
        bool _tokenHolder;
    }

    mapping(address => TokenHolderInfo) public tokenHolderInfos;
    mapping(address => uint256) public balanceAddress;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        balanceAddress[owner] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function inc() internal {
        _transactionId++;
    }

    function transfer(address _to, uint256 _value) public returns(bool){
        require(balanceAddress[msg.sender] >= _value, "Account doesn't have enough tokens to send");
        balanceAddress[msg.sender] -= _value;
        balanceAddress[_to] += _value;

        inc();

        TokenHolderInfo storage tokenHolderInfo = tokenHolderInfos[_to];
        tokenHolderInfo._from = msg.sender;
        tokenHolderInfo._to = _to;
        tokenHolderInfo._tokenHolder = true;
        tokenHolderInfo._tokenId = _transactionId;
        tokenHolderInfo._totalSupply = _value;

        holderToken.push(_to);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _approvedUser, uint256 _value) public returns(bool){
        allowance[msg.sender][_approvedUser] = _value;
        emit Approval(msg.sender, _approvedUser, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns(bool) {
        balanceAddress[_from] -= _value;
        balanceAddress[_to] += _value;
        allowance[_from][msg.sender] = _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function getTokenHolderData(address _addr) public view returns(
        uint256,
        address,
        address,
        uint256,
        bool
    ) {
        return (
            tokenHolderInfos[_addr]._tokenId,
            tokenHolderInfos[_addr]._from,
            tokenHolderInfos[_addr]._to,
            tokenHolderInfos[_addr]._totalSupply,
            tokenHolderInfos[_addr]._tokenHolder
        );
    }

    function getTokenHolder() public view returns(address[] memory) {
        return holderToken;
    }
}