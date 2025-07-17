// server.ts

import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { parse } from 'node:url';
import next from 'next';
import redisClient from './lib/redis';

const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = nextApp.getRequestHandler();

const redis_client = redisClient;

nextApp.prepare().then(() => {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    handle(req, res, parse(req.url || '', true));
  });

  server.listen(3000, '0.0.0.0', () => {
    console.log('🚀 Server listening on port 3000 (HTTP + WebSockets)');
  });
});
