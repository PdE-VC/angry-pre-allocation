# ANGRY Pre-Allocation

## Overview
**ANGRY Pre-Allocation** is a Solidity smart contract that manages the **pre-allocation of ANGRY tokens** before the official launch. It ensures secure and transparent distribution to predefined recipients.

## Project Structure
```
├── build/contracts/        # Compiled contract artifacts
│   ├── PreSale.json
├── contracts/              # Solidity contracts
│   ├── PreSale.sol
├── migrations/             # Deployment scripts for Truffle
│   ├── 2_deploy_migrations.js
├── test/                   # Automated tests
│   ├── PreSale.test.js
├── report.json             # Security analysis report
├── truffle-config.js       # Truffle configuration
├── .gitignore              # Ignored files
```

## Getting Started

### Prerequisites
- Node.js & npm
- Truffle (`npm install -g truffle`)
- Ganache (optional, for local blockchain testing)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/angry-pre-allocation.git
   cd angry-pre-allocation
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile the smart contracts:
   ```bash
   truffle compile
   ```
4. Deploy the contract (local testnet):
   ```bash
   truffle migrate --network development
   ```

## Running Tests
Run the contract tests with:
```bash
truffle test
```

## Security Analysis
For static analysis using **Slither**, run:
```bash
slither .
```
For Mythril security checks:
```bash
mythril analyze contracts/PreSale.sol
```

## License
This project is licensed under the **MIT License**.

