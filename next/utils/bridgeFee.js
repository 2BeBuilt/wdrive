import {
  AxelarQueryAPI,
  CHAINS,
  Environment,
} from '@axelar-network/axelarjs-sdk'

function calculateBridgeFee(source, destination, options = {}) {
  const api = new AxelarQueryAPI({ environment: Environment.TESTNET })
  const { gasLimit, gasMultiplier, symbol } = options

  return api.estimateGasFee(
    CHAINS.TESTNET[source.name.toUpperCase()],
    CHAINS.TESTNET[destination.name.toUpperCase()],
    symbol || source.tokenSymbol,
    gasLimit,
    gasMultiplier
  )
}
export { calculateBridgeFee }
