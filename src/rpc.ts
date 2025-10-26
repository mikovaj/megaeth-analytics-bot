import 'dotenv/config';
import { ethers } from 'ethers';

export function getProvider(): ethers.JsonRpcProvider {
  const url = process.env.RPC_URL!;
  return new ethers.JsonRpcProvider(url, {
    chainId: 6342, // MegaETH Testnet
    name: 'megaeth-testnet'
  });
}
