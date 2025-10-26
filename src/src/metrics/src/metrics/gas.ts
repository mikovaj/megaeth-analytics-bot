import { ethers } from 'ethers';

export async function getGasPriceGwei(p: ethers.JsonRpcProvider) {
  const gp = await p.getGasPrice();
  const gwei = Number(ethers.formatUnits(gp, 'gwei'));
  return gwei;
}

export async function getBaseFeeGwei(p: ethers.JsonRpcProvider, blockCount = 20) {
  const latest = await p.getBlockNumber();
  const res = await p.send('eth_feeHistory', [blockCount, ethers.toBeHex(latest), []]);
  const baseFees: number[] = res.baseFeePerGas.map((hex: string) => Number(ethers.formatUnits(BigInt(hex), 'gwei')));
  const arr = baseFees.slice(0, -1);
  const avg = arr.reduce((a, b) => a + b, 0) / Math.max(arr.length, 1);
  return { avgBaseFeeGwei: avg, sample: arr };
}
