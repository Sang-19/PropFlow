import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

// Load the private key generated previously
const privateKey = fs.readFileSync(path.join(__dirname, '../../../keys/private.pem'), 'utf8');

export const generateAccessToken = (userId: string, role: string, tenantId: string) => {
  return jwt.sign(
    { userId, role, tenantId }, 
    privateKey, 
    {
      algorithm: 'RS256',
      expiresIn: '60s' // Required 60s expiration
    }
  );
};