# WomanTech Connect MVP - BlockDAG Edition

> **On-chain mentorship platform for women in tech** - A production-ready, BlockDAG-optimized smart contract system for verifiable mentorship confirmations and reputation tracking.

## Project Goal & MVP Scope

WomanTech Connect provides a *decentralized foundation for women in tech mentorship by recording mentorship sessions on-chain with verifiable reputation tracking. The MVP focuses on four core features:

1. User Registration - On-chain registration for mentors and mentees
2. Mentorship Confirmation - Verifiable session tracking between mentor-mentee pairs
3. Reputation System - Public reputation counter for mentors based on confirmed sessions
4. User Discovery - Paginated user discovery for finding mentors and mentees

## Why This Fits BlockDAG Hackathon Judging

- BlockDAG Innovation: First mentorship platform built specifically for BlockDAG's EVM-compatible architecture
- Technical Excellence: Production-clean Solidity with comprehensive testing optimized for BlockDAG
- BlockDAG Integration: Native compatibility with BlockDAG Primordial Testnet (Chain ID: 1043)
- UI/UX Ready: Events emitted for easy frontend integration on BlockDAG
- BlockDAG Architecture: Designed to leverage BlockDAG's unique blockchain capabilities

## 🚀 Quick Start

### Prerequisites
- [Foundry](https://getfoundry.sh/) installed
- EVM-compatible wallet with BlockDAG testnet funds

### Setup
```bash
# Clone and setup
git clone <repository-url>
cd womantech-connect

# Copy environment file and configure
cp env.example .env
# Edit .env with your RPC_URL and PRIVATE_KEY

# Install dependencies and build
forge install
forge build

# Run tests
forge test -vvv

# Generate gas report
forge test --gas-report
```

### Deploy to BlockDAG
```bash
# Deploy to BlockDAG Primordial Testnet
forge script script/Deploy.s.sol:Deploy --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
```

## 📋 ABI & Addresses

After deployment, find the contract artifacts in:
- ABI: `out/WomanTech.sol/WomanTech.json`
- Address: Printed in console and saved to `deployment.txt`

## 3-Minute Demo Path

### 1. Register Users
```bash
# Register a mentor
cast send $CONTRACT_ADDRESS "register(string,uint8)" "Alice" 1 --private-key $MENTOR_KEY

# Register a mentee  
cast send $CONTRACT_ADDRESS "register(string,uint8)" "Bob" 2 --private-key $MENTEE_KEY
```

### 2. Confirm Mentorship Session
```bash
# Mentor confirms a session with mentee
cast send $CONTRACT_ADDRESS "confirmMentorship(address)" $MENTEE_ADDRESS --private-key $MENTOR_KEY
```

### 3. View Reputation Increment
```bash
# Check mentor's updated reputation
cast call $CONTRACT_ADDRESS "getUser(address)" $MENTOR_ADDRESS
```

### 4. Discover Users
```bash
# Get first 5 users
cast call $CONTRACT_ADDRESS "getUsers(uint256,uint256)" 0 5

# Get total user count
cast call $CONTRACT_ADDRESS "totalUsers()"
```

## Contract Architecture

### Core Functions
- `register(name, role)` - Register as mentor (1) or mentee (2)
- `confirmMentorship(mentee)` - Confirm a mentorship session
- `getUser(address)` - Get user profile and reputation
- `getUsers(offset, limit)` - Paginated user discovery
- `totalUsers()` - Get total registered users

### Events
- `UserRegistered(account, role, name)` - Emitted on registration
- `MentorshipConfirmed(mentor, mentee, reputation, sessionId)` - Emitted on session confirmation

### Data Model
```solidity
struct User {
    address account;
    string name;
    Role role;        // 0=Unknown, 1=Mentor, 2=Mentee
    uint64 reputation;
    bool registered;
}
```

## Testing

Comprehensive test suite includes:
- Registration flow validation
- Mentorship confirmation with reputation tracking
- Role-based access control
- Pagination functionality
- Fuzz testing for edge cases
- Custom error handling

Run tests: `forge test -vvv`

## Gas Optimization

The contract is optimized for hackathon deployment:
- Custom errors for gas efficiency
- Minimal storage operations
- Efficient pagination with bounded loops
- Optimized struct packing

## Out of Scope (MVP Focus)

To keep the hackathon demo focused, these features are **intentionally excluded**:
- Venture Capital issuance
- Token economics
- DAO governance
- In-app messaging
- Automated matching algorithms
- Complex reputation formulas

## BlockDAG Network Support

**Target Network**: BlockDAG Primordial Testnet (Chain ID: 1043)

Configure via `.env`:
```
# BlockDAG Primordial Testnet
RPC_URL=https://rpc.primordial.bdagscan.com
CHAIN_ID=1043
CURRENCY_SYMBOL=BDAG

# Get testnet tokens: https://primordial.bdagscan.com/faucet
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
```

## Security Features

- Input validation for all parameters
- Role-based access control
- Duplicate session prevention
- Zero-address protection
- Bounded pagination to prevent DoS

## Future Enhancements

Post-hackathon roadmap for BlockDAG ecosystem:
- Multi-session reputation decay
- Mentor verification badges
- Cross-chain reputation portability within BlockDAG network
- Integration with existing mentorship platforms
- BlockDAG-specific features leveraging DAG architecture

---

