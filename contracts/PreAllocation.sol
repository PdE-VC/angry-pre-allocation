// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract PreAllocation {
    address public immutable owner;
    uint256 public immutable totalSupply; // Límite total de tokens
    uint256 public totalAssigned; // Tokens ya asignados

    mapping(address => uint256) public balances;

    event TokensAssigned(address indexed targetAddress, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor(uint256 _totalSupply) {
        require(_totalSupply > 0, "Total supply must be greater than 0");
        owner = msg.sender;
        totalSupply = _totalSupply;
        totalAssigned = 0; // Inicialmente no se han asignado tokens
    }

    // Leer la cantidad de monedas asignada a una dirección
    function getBalance(address targetAddress) public view returns (uint256) {
        return balances[targetAddress];
    }

    // Agregar una cantidad de monedas a una dirección (solo owner)
    function addTokens(address targetAddress, uint256 amount) public onlyOwner {
        require(targetAddress != address(0), "Invalid address");
        require(amount > 0, "Amount must be greater than 0");
        require(totalAssigned + amount <= totalSupply, "Cannot exceed total supply");

        balances[targetAddress] += amount;
        totalAssigned += amount;

        emit TokensAssigned(targetAddress, amount);
    }
}