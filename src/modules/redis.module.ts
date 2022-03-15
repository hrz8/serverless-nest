import {Module, Global, CACHE_MANAGER} from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import * as cacheManager from 'cache-manager';

import {RedisRepository} from '@/redis/repository';
import {IRedisConfig} from '@/types/redisconfig.interface';

export function RedisModuleFactory(
  {host, port, ttl}: IRedisConfig
): any {
  @Global()
  @Module({
    providers: [
      {
        provide: CACHE_MANAGER,
        useFactory: () =>
          cacheManager.caching({
            store: redisStore,
            host,
            port,
            ttl,
          }),
      },
      RedisRepository,
    ],
    exports: [CACHE_MANAGER, RedisRepository],
  })
  class RedisModule {}

  return RedisModule;
}
