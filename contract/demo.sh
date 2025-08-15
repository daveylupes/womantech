#!/bin/bash

# WomanTech Connect MVP - BlockDAG Demo Script
# This script demonstrates the core functionality of the WomanTech contract on BlockDAG

echo "🚀 WomanTech Connect MVP - BlockDAG Demo"
echo "========================================="

# Set up environment (replace with your actual values)
export CONTRACT_ADDRESS="0x..."  # Replace with deployed contract address
export MENTOR_KEY="0x..."        # Replace with mentor private key
export MENTEE_KEY="0x..."        # Replace with mentee private key
export MENTOR_ADDRESS="0x..."    # Replace with mentor address
export MENTEE_ADDRESS="0x..."    # Replace with mentee address
export RPC_URL="https://..."     # Replace with your RPC URL

echo ""
echo "📋 Demo Steps:"
echo "1. Register a mentor"
echo "2. Register a mentee"
echo "3. Confirm a mentorship session"
echo "4. View reputation increment"
echo "5. Discover users"
echo ""

echo "🔧 Step 1: Register Mentor"
echo "cast send $CONTRACT_ADDRESS \"register(string,uint8)\" \"Alice\" 1 --private-key $MENTOR_KEY --rpc-url $RPC_URL"
echo ""

echo "🔧 Step 2: Register Mentee"
echo "cast send $CONTRACT_ADDRESS \"register(string,uint8)\" \"Bob\" 2 --private-key $MENTEE_KEY --rpc-url $RPC_URL"
echo ""

echo "🔧 Step 3: Confirm Mentorship Session"
echo "cast send $CONTRACT_ADDRESS \"confirmMentorship(address)\" $MENTEE_ADDRESS --private-key $MENTOR_KEY --rpc-url $RPC_URL"
echo ""

echo "🔧 Step 4: View Mentor's Reputation"
echo "cast call $CONTRACT_ADDRESS \"getUser(address)\" $MENTOR_ADDRESS --rpc-url $RPC_URL"
echo ""

echo "🔧 Step 5: Discover Users"
echo "cast call $CONTRACT_ADDRESS \"getUsers(uint256,uint256)\" 0 5 --rpc-url $RPC_URL"
echo ""

echo "🔧 Step 6: Get Total Users"
echo "cast call $CONTRACT_ADDRESS \"totalUsers()\" --rpc-url $RPC_URL"
echo ""

echo "📊 Gas Report:"
echo "Run 'forge test --gas-report' to see gas usage for all functions"
echo ""

echo "✅ Demo complete! The WomanTech Connect MVP is ready for BlockDAG hackathon presentation."
