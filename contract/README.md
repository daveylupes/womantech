# WomanTech Connect Smart Contracts

This directory contains the complete Foundry project for the WomanTech Connect smart contracts.

## Quick Start

```bash
# Install dependencies
forge install

# Build contracts
forge build

# Run tests
forge test -vvv

# Deploy to BlockDAG Primordial Testnet
cp env.example .env
# Edit .env with your RPC_URL and PRIVATE_KEY
forge script script/Deploy.s.sol:Deploy --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
```

## Project Structure

- `src/` - Smart contract source files
- `test/` - Test files
- `script/` - Deployment scripts
- `lib/` - Dependencies (forge-std)
- `foundry.toml` - Foundry configuration
- `env.example` - Environment template
- `DEPLOYMENT.md` - Deployment guide
- `demo.sh` - Demo script

## BlockDAG Configuration

Configure for BlockDAG Primordial Testnet:
- RPC URL: `https://rpc.primordial.bdagscan.com`
- Chain ID: `1043`
- Faucet: `https://primordial.bdagscan.com/faucet`

See `DEPLOYMENT.md` for detailed instructions.
