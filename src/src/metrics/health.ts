import { ethers } from 'ethers';

export async function getHealthSnapshot(p: ethers.JsonRpcProvider) {
  const [chainId, blockNumber, gasPrice] = await Promise.all([
    p.getNetwork().then(n => n.chainId),
    p.getBlockNumber(),
    p.getGasPrice()
  ]);

  return {
    chainId,
    blockNumber,
    gasPriceGwei: Number(ethers.formatUnits(gasPrice, 'gwei'))
  };
}
