#!/bin/bash
set -euxo pipefail

RPC_URL=http://localhost:8545
ANVIL1_PRIVKEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

export DEPLOYMENT=base

pkill anvil || true

# rpc urls: https://chainlist.org/chain/8453
anvil --chain-id 9999 --fork-url "https://mainnet.base.org" &
ANVIL_PID=$!

sleep 5
forge script script/deploy/Core.s.sol:Deploy \
    --rpc-url $RPC_URL --private-key $ANVIL1_PRIVKEY --broadcast
forge script script/deploy/Uniswapv2.s.sol:Deploy \
    --rpc-url $RPC_URL --private-key $ANVIL1_PRIVKEY --broadcast
forge script script/deploy/Aave.s.sol:Deploy \
    --rpc-url $RPC_URL --private-key $ANVIL1_PRIVKEY --broadcast

wait $ANVIL_PID