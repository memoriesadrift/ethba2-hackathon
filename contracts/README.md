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
cast call $UNI_FACTORY "allPairsLength()(uint256)"
cast call $UNI_FACTORY "allPairs(uint256)(address)" 0

Verify deployment of our core contracts:
GAME_MANAGER=$(jq -r ".gameManager" contracts/addresses/base/core.json)
TOKEN_MANAGER=$(jq -r ".tokenManager" contracts/addresses/base/core.json)
cast call $GAME_MANAGER "tokenManager()(address)"
