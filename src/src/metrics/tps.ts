import { ethers } from 'ethers';
import { getTxCountInBlock } from './blocks.js';

export async function estimateTps(
  p: ethers.JsonRpcProvider,
  latestBlock: number,
  windowSeconds = 10
) {
  const blocks = Array.from({ length: windowSeconds }, (_, i) => latestBlock - i).filter(n => n >= 0);
  const counts = await Promise.all(blocks.map(n => getTxCountInBlock(p, n)));
  const sum = counts.reduce((a, b) => a + b, 0);
  return sum / blocks.length;
}
