import { getEnv } from '@lib/env';

if (getEnv('NODE_ENV', 'development') === 'development') {
  require('dotenv').load();
}
