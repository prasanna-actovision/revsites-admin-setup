// /src/lib/redis.ts

import Redis from 'ioredis';

// const redisClient = new Redis({
//   host: process.env.REDIS_HOST || "127.0.0.1",
//   port: Number(process.env.REDIS_PORT) || 6379,
// });

const redisClient = new Redis({
  host: process.env.VALKEY_HOST || '127.0.0.1',
  port: Number(process.env.VALKEY_PORT) || 6379,
  password: process.env.VALKEY_PASSWORD || '',
});

redisClient.on('connect', () => {
  console.log('[Redis] connected');
});

redisClient.on('error', (err) => {
  console.error('[Redis] error', err);
});

// export default new Redis(process.env.REDIS_URL_LIVE!);
// export default new Redis('redis://:gooupsRedis2025#@redis-dev.gooups.social:6379');
// export default new Redis('redis://:gooupsRedis2025#@34.71.163.129:6379');

export default redisClient;
