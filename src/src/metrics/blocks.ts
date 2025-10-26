import { ethers } from 'ethers';

export async function getLatestBlockNumber(p: ethers.JsonRpcProvider) {
  return await p.getBlockNumber();
}

export async function getTxCountInBlock(p: ethers.JsonRpcProvider, blockNumber: number) {
  const count = await p.send('eth_getBlockTransactionCountByNumber', [ethers.toBeHex(blockNumber)]);
  return Number(count);
}
