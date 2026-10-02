import crypto from 'crypto';
import { createClient } from 'redis';

// Connect to the Redis instance you set up
export const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
redisClient.connect().catch(console.error);

export const generateRefreshToken = async (userId: string, familyId?: string) => {
  // Generate a random 256-bit (32 bytes) opaque string
  const token = crypto.randomBytes(32).toString('hex');

  // Hash with SHA-256 for secure Redis storage
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Group by family for rotation (create new family on initial login)
  const family = familyId || crypto.randomBytes(16).toString('hex');
  const key = `rt:${userId}:${family}`;

  // Store hashed token in Redis with a 7-day expiration (in seconds)
  await redisClient.set(key, hashedToken, { EX: 7 * 24 * 60 * 60 });

  return { token, family };
};