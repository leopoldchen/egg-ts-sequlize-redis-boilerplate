'use strict';

import { app } from 'egg-mock/bootstrap';
import factories from './factories';
import * as Redis from 'ioredis-mock';

before(async () => {
    factories(app);
    app.redis = new Redis();
});

afterEach(async () => {
    await app.redis.flushdb();
    await app.model.truncate({ restartIdentity: true });
});
