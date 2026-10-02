import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import jose from 'node-jose';

const router = Router();

router.get('/.well-known/jwks.json', async (req, res) => {
  try {
    const pubKey = fs.readFileSync(path.join(__dirname, '../../../keys/public.pem'), 'utf8');

    // Convert PEM to JWK
    const key = await jose.JWK.asKey(pubKey, 'pem');
    const keystore = jose.JWK.createKeyStore();
    await keystore.add(key, 'pem', { alg: 'RS256', use: 'sig' });

    // Return public keys with a Cache-Control header
    res.setHeader('Cache-Control', 'public, max-age=600'); // 10 minutes cache
    res.json(keystore.toJSON());
  } catch (error) {
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'Could not load JWKS' } });
  }
});

export default router;