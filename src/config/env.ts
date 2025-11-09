export const env = {
  PORT: Number(process.env.PORT || 4000),
  JWT_SECRET: process.env.JWT_SECRET || 'dev',
  CACHE_TTL_SECONDS: Number(process.env.CACHE_TTL_SECONDS || 60),
};
