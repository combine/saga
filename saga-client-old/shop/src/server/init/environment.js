import path from 'path';
import fs from 'fs';

const env = process.env.NODE_ENV || 'development';
let opts = {};

if (env === 'test') {
  const envPath = path.join(process.cwd(), '.env.test');

  if (fs.existsSync(envPath)) {
    opts = { path: envPath };
  }
}

require('dotenv').load(opts);
