import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import appConstants from '../constants/app.constant';
import {ONE_HOUR_IN_SEC} from '../constants/time.constant';

@Injectable()
export class RedisRepository {
  private CACHE_PREFIX = `${appConstants.SERVICE_NAME}-${process.env.STAGE}`;

  private REDIS_AVAILABLE = appConstants.REDIS_ENABLE;

  private ttlRedisDefault = 12 * ONE_HOUR_IN_SEC;

  constructor(@Inject(CACHE_MANAGER) private manager) {
    const client = this.manager.store.getClient();

    this.setClient(client);

    this.manager.ignoreCacheErrors = true;
  }

  isAvailable(): boolean {
    return this.REDIS_AVAILABLE;
  }

  private setRedisAvailability(value: boolean): void {
    this.REDIS_AVAILABLE = value;
  }

  private setClient(client) {
    if (this.isAvailable()) {
      client.on('error', (error) => {
        console.error("Can't connect to redis server", error);

        this.setRedisAvailability(false);
        client.end(true);
      });

      client.on('connect', () => {
        console.info('Connected to redis server');
      });
    } else {
      console.info('Skip connection to redis server');

      const endConnection = () => {
        client.end(true);
      };

      client.on('error', endConnection);
      client.on('connect', endConnection);
    }
  }

  async getOrSetCache<T = any>(
    key: string,
    fallback: () => Promise<any>,
    ttl = this.ttlRedisDefault,
  ): Promise<T> {
    const cacheKey = `${this.CACHE_PREFIX}:${key}`;

    if (!this.isAvailable()) {
      console.info(`Redis unavailable, skip using cache with key: ${cacheKey}`);
      return await fallback();
    }

    const cachedData: T = await this.manager.get(cacheKey);

    const result = cachedData ?? (await fallback());

    if (!cachedData && result !== undefined) {
      console.info(`Set Cache with key: ${cacheKey}`);
      console.info(`Cache value: ${JSON.stringify(result)}`);

      await this.manager.set(cacheKey, result, {ttl});
    } else if (cachedData) {
      console.info(`Using Cache with key: ${cacheKey}`);
      console.info(`Cache value: ${JSON.stringify(cachedData)}`);
    }

    return result;
  }

  async clearCache(key: string): Promise<boolean> {
    const cacheKey = `${this.CACHE_PREFIX}:${key}`;

    if (!this.isAvailable()) {
      console.info('Redis is not available');

      return false;
    }

    const cacheKeys = await this.manager.store.keys(cacheKey);

    if (!cacheKeys.length) {
      return false;
    }

    const result = await this.manager.store.del(cacheKeys);

    return Boolean(result);
  }
}
