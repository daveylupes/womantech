# WomanTech Connect MVP - BlockDAG Deployment Guide

## 🚀 BlockDAG Primordial Testnet Deployment

### BlockDAG Primordial Testnet (Recommended for BlockDAG Hackathon)
**Status:** ✅ **Fully operational and tested**

1. **Get BlockDAG Testnet Details:**
   - **Network Name:** Primordial BlockDAG Testnet
   - **Chain ID:** 1043
   - **RPC URL:** https://rpc.primordial.bdagscan.com
   - **Explorer:** https://primordial.bdagscan.com/
   - **Faucet:** https://primordial.bdagscan.com/faucet

2. **Configure Environment:**
   ```bash
   cp env.example .env
   # Edit .env with BlockDAG details:
   RPC_URL=https://rpc.primordial.bdagscan.com
   PRIVATE_KEY=0xYOUR_PRIVATE_KEY
   ```

3. **Deploy:**
   ```bash
   forge script script/Deploy.s.sol:Deploy --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
   ```

## 🔧 Pre-Deployment Checklist

- [ ] Foundry installed (`forge --version`)
- [ ] Dependencies installed (`forge install`)
- [ ] Tests passing (`forge test`)
- [ ] Environment variables configured
- [ ] Testnet ETH/tokens available
- [ ] Private key ready (without 0x prefix)

## 📋 Post-Deployment Steps

1. **Save Contract Address:**
   ```bash
   # The deployment script will output the contract address
   # Save it for your demo
   export CONTRACT_ADDRESS="0x..."
   ```

2. **Verify Contract (Optional):**
   ```bash
   forge script script/Deploy.s.sol:Deploy --rpc-url $RPC_URL --private-key $PRIVATE_KEY --verify
   ```

3. **Test Live Contract:**
   ```bash
   # Register a mentor
   cast send $CONTRACT_ADDRESS "register(string,uint8)" "Alice" 1 --private-key $PRIVATE_KEY --rpc-url $RPC_URL
   
   # Check registration
   cast call $CONTRACT_ADDRESS "getUser(address)" $YOUR_ADDRESS --rpc-url $RPC_URL
   ```

## 🎬 Hackathon Demo Flow

1. **Setup (30 seconds):**
   - Show contract deployment
   - Display contract address

2. **Live Demo (2 minutes):**
   - Register mentor and mentee
   - Confirm mentorship session
   - Show reputation increment
   - Display user discovery

3. **Technical Highlights (30 seconds):**
   - Gas optimization
   - Event emission
   - Security features

## 🔗 Useful Links

- **BlockDAG Faucet:** https://primordial.bdagscan.com/faucet
- **BlockDAG Explorer:** https://primordial.bdagscan.com/
- **BlockDAG Documentation:** https://docs.blockdagnetwork.io/
- **Foundry Book:** https://book.getfoundry.sh/

## 🆘 Troubleshooting

**"RPC URL not found"**
- Check your `.env` file exists
- Verify RPC URL is correct
- Test with `curl` first

**"Insufficient funds"**
- Get more BlockDAG testnet tokens from faucet
- Check gas price settings

**"Contract deployment failed"**
- Check gas limit
- Verify private key format
- Try with `--legacy` flag for older networks

## 📊 Gas Estimates

- **Deployment:** ~930,000 gas
- **Register:** ~22,000-182,000 gas
- **Confirm Mentorship:** ~24,000-77,000 gas
- **Get User:** ~8,000-13,000 gas
- **Get Users:** ~3,000-113,000 gas

---

**Ready for your hackathon presentation! 🏆**
