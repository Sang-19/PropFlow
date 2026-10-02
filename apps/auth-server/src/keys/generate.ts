import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Generates a new RSA key pair for RS256 signing
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

// In a real app, load this from .env, but for the script we save it to a file
const keyDir = path.join(__dirname, '../../keys');
if (!fs.existsSync(keyDir)) fs.mkdirSync(keyDir);

fs.writeFileSync(path.join(keyDir, 'private.pem'), privateKey);
fs.writeFileSync(path.join(keyDir, 'public.pem'), publicKey);

console.log("RSA Key pair generated successfully.");