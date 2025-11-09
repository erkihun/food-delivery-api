import apicache from 'apicache';
import { env } from '../config/env.js';

const cache = apicache.options({ statusCodes: { include: [200] } }).middleware;
export const cache60s = cache(`${env.CACHE_TTL_SECONDS} seconds`);
