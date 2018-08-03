import { getEnv } from '@lib/env';
import path from 'path';
import fs from 'fs';

const env = getEnv('NODE_ENV', 'development');

// NOTE: In production, we should set environment variables manually
if (env !== 'production') {
  let opts = {};

  if (env === 'test') {
    const envPath = path.join(process.cwd(), '.env.test');

    if (fs.existsSync(envPath)) {
      opts = { path: envPath };
    }
  }

  require('dotenv').load(opts);
}
