import cron from 'node-cron';
import { runOnce } from './index.js';

export function startScheduler() {
  const expr = process.env.TWEET_CRON || '0 * * * *';
  cron.schedule(expr, async () => {
    try {
      await runOnce();
    } catch (e) {
      console.error('Scheduled run failed:', e);
    }
  });
}
