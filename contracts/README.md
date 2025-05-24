Start mainnet Base fork:

`make start-base`

Verify UniswapV2 deployment:

UNI_FACTORY=$(jq -r ".factory" contracts/addresses/base/original/uniswapv2.json)
UNI_ROUTER=$(jq -r ".v2Router02" contracts/addresses/base/original/uniswapv2.json)
cast call $UNI_FACTORY "allPairsLength()(uint256)"
cast call $UNI_FACTORY "allPairs(uint256)(address)" 0
cast call $UNI_ROUTER "factory()(address)"

Verify _our clone_ deployment of UniswapV2:

UNI_FACTORY_CLONE=$(jq -r ".factory" contracts/addresses/base/clone/uniswapv2.json)
UNI_ROUTER_CLONE=$(jq -r ".v2Router02" contracts/addresses/base/clone/uniswapv2.json)
cast call $UNI_FACTORY_CLONE "allPairsLength()(uint256)"
cast call $UNI_FACTORY_CLONE "allPairs(uint256)(address)" 0
cast call $UNI_ROUTER_CLONE "factory()(address)"

Verify deployment of our core contracts:
GAME_MANAGER=$(jq -r ".gameManager" contracts/addresses/base/core.json)
TOKEN_MANAGER=$(jq -r ".tokenManager" contracts/addresses/base/core.json)
cast call $GAME_MANAGER "tokenManager()(address)"

cast send $GAME_MANAGER "enterCompetition()()" --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

ETH_USDC=$(jq -r ".pairs.ethUsdc" contracts/addresses/base/original/uniswapv2.json)
cast call $ETH_USDC "token0()(address)"

### Swap
addresses
UNI_ROUTER_CLONE=$(jq -r ".v2Router02" contracts/addresses/base/clone/uniswapv2.json)
TOKEN_MANAGER=$(jq -r ".tokenManager" contracts/addresses/base/core.json)
ETH=$(jq -r ".eth" contracts/addresses/base/original/tokens.json)
USDC=$(jq -r ".usdc" contracts/addresses/base/original/tokens.json)
DINO=$(jq -r ".dino" contracts/addresses/base/original/tokens.json)
USER=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
USER_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
GAME_MANAGER=$(jq -r ".gameManager" contracts/addresses/base/core.json)

check balances
ETH_ID=$(cast call $TOKEN_MANAGER "tokenAddressToId(address)(uint256)" $ETH)
DINO_ID=$(cast call $TOKEN_MANAGER "tokenAddressToId(address)(uint256)" $DINO)
cast call $TOKEN_MANAGER "balanceOf(address,uint256)" $USER $ETH_ID
cast call $TOKEN_MANAGER "balanceOf(address,uint256)" $USER $DINO_ID

enter competition (to get funds!)
cast send $GAME_MANAGER "enterCompetition()()" --private-key $USER_KEY
cast call $TOKEN_MANAGER "balanceOf(address,uint256)" $USER $ETH_ID
cast call $TOKEN_MANAGER "balanceOf(address,uint256)" $USER $ETH_ID
cast call $TOKEN_MANAGER "balanceOf(address,uint256)" $USER $DINO_ID

swap (call to simulate, send to execute)
cast send $UNI_ROUTER_CLONE "swapTokensForExactTokens(uint256,uint256,address[],address,uint256)(uint256[])" 100 1000000000000000 "[${DINO},${ETH}]" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1749083413 --private-key $USER_KEY
cast call $TOKEN_MANAGER "balanceOf(address,uint256)" $USER $ETH_ID
cast call $TOKEN_MANAGER "balanceOf(address,uint256)" $USER $DINO_ID
