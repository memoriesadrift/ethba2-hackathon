import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import addresses from "./contracts/addresses/base/core.json";

export default defineConfig({
  out: 'src/abi/index.ts',
  plugins: [
    foundry({
      deployments: {
        "GameManager": addresses.gameManager as `0x${string}`,
        "TokenManager": addresses.tokenManager as `0x${string}`,
        "LidoClone": addresses.lidoClone as `0x${string}`,
      },
      project: "./contracts",
      include: ["GameManager.sol/**", "TokenManager.sol/**", "LidoClone.sol/**"],
    }),
    react()
  ],
})
