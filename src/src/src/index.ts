import 'dotenv/config';
import { getProvider } from './rpc.js';
import { estimateTps } from './metrics/tps.js';
import { getLatestBlockNumber } from './metrics/blocks.js';
import { getGasPriceGwei, getBaseFeeGwei } from './metrics/gas.js';
import { getHealthSnapshot } from './metrics/health.js';
import { postTweet } from './tweet.js';
import { startScheduler } from './scheduler.js';

const BRAND = 'MegaETH';
const HANDLE = process.env.X_USERNAME || '';

export async function runOnce() {
  const p = getProvider();

  const latest = await getLatestBlockNumber(p);
  const tps10s = await estimateTps(p, latest, 10);
  const gasGwei = await getGasPriceGwei(p);
  const { avgBaseFeeGwei } = await getBaseFeeGwei(p, 20);

  const health = process.env.ENABLE_HEALTH_TWEET === 'true'
    ? await getHealthSnapshot(p)
    : null;

  const lines = [
    `🔎 ${BRAND} – realtime stats (testnet)`,
    `• TPS (10s avg): ${tps10s.toFixed(1)}`,
    `• Latest EVM block: ${latest}`,
    `• Gas price: ~${gasGwei.toFixed(4)} gwei`,
    `• Base fee (avg): ~${avgBaseFeeGwei.toFixed(4)} gwei`,
    `• Source: RPC`,
    HANDLE ? `\n${HANDLE}` : ''
  ];

  if (health) {
    lines.splice(2, 0, `• ChainId: ${health.chainId}`);
  }

  const text = lines.filter(Boolean).join('\n');
  const res = await postTweet(text);
  console.log('Tweeted:', res);
}

if (process.env.NODE_ENV !== 'test') {
  runOnce().catch(err => console.error(err));
  startScheduler();
}
