# WomanTech Connect - Frontend Integration Guide

## 🚀 Quick Start

This guide will help you deploy the WomanTech contract and connect it to the frontend.

## Step 1: Deploy the Contract

### Prerequisites
- Foundry installed (`forge --version`)
- BlockDAG testnet tokens (get from [faucet](https://primordial.bdagscan.com/faucet))
- Private key for deployment

### Deploy to BlockDAG Testnet

1. **Navigate to contract directory:**
   ```bash
   cd contract
   ```

2. **Set up environment:**
   ```bash
   cp env.example .env
   # Edit .env with your details:
   RPC_URL=https://rpc.primordial.bdagscan.com
   PRIVATE_KEY=0xYOUR_PRIVATE_KEY_WITHOUT_0x_PREFIX
   ```

3. **Deploy the contract:**
   ```bash
   forge script script/Deploy.s.sol:Deploy --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
   ```

4. **Save the contract address** from the deployment output.

## Step 2: Update Frontend Contract Address

1. **Open the contract configuration file:**
   ```bash
   cd ../frontend
   # Edit src/lib/contract.ts
   ```

2. **Replace the placeholder address:**
   ```typescript
   // Change this line:
   export const WOMANTECH_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";
   
   // To your deployed contract address:
   export const WOMANTECH_CONTRACT_ADDRESS = "0xYOUR_DEPLOYED_CONTRACT_ADDRESS";
   ```

## Step 3: Test the Integration

1. **Start the frontend:**
   ```bash
   npm run dev
   ```

2. **Connect your wallet** to BlockDAG Primordial Testnet (Chain ID: 1043)

3. **Test the features:**
   - Register as a mentor or mentee
   - View community members
   - Confirm mentorship sessions
   - Check contract status

## 🔧 Contract Functions Available

### User Registration
```typescript
// Register as a mentor
await register("Alice", Role.Mentor);

// Register as a mentee  
await register("Bob", Role.Mentee);
```

### User Discovery
```typescript
// Get current user
const { user } = useCurrentUser();

// Get all users
const { users } = useUsers(0, 10);

// Get total users
const { total } = useTotalUsers();
```

### Mentorship
```typescript
// Confirm mentorship session
await confirmMentorship(menteeAddress);
```

## 📊 Contract Events

The contract emits events that can be listened to:

- `UserRegistered(address indexed account, Role role, string name)`
- `MentorshipConfirmed(address indexed mentor, address indexed mentee, uint64 newReputation, uint256 indexed sessionId)`

## 🛠️ Troubleshooting

### "Contract not deployed" error
- Check that you've updated the contract address in `src/lib/contract.ts`
- Verify the contract was deployed successfully
- Check the contract address on BlockDAG explorer

### "Wrong network" error
- Make sure your wallet is connected to BlockDAG Primordial Testnet (Chain ID: 1043)
- Add the network manually if needed:
  - RPC: `https://rpc.primordial.bdagscan.com`
  - Chain ID: `1043`
  - Currency: `BDAG`

### "Insufficient funds" error
- Get more BlockDAG testnet tokens from the [faucet](https://primordial.bdagscan.com/faucet)

### Transaction failures
- Check gas settings in your wallet
- Ensure you have enough BDAG tokens for gas fees
- Try increasing gas limit if needed

## 🔗 Useful Links

- **BlockDAG Explorer:** https://primordial.bdagscan.com/
- **BlockDAG Faucet:** https://primordial.bdagscan.com/faucet
- **BlockDAG Documentation:** https://docs.blockdagnetwork.io/
- **Foundry Book:** https://book.getfoundry.sh/

## 📝 Next Steps

After successful integration:

1. **Add event listeners** for real-time updates
2. **Implement session tracking** from mentorship confirmations
3. **Add user profiles** with additional metadata
4. **Create mentorship scheduling** features
5. **Add reputation system** enhancements

---

**Your WomanTech Connect dApp is now ready! 🎉**
