import { Router } from 'express';
import bcrypt from 'bcrypt';
import { loginSchema } from '../../packages/shared'; // Import your Zod schema from Step 1
import { generateAccessToken } from '../utils/jwt';
import { generateRefreshToken } from '../utils/refreshToken.js;
// import { User } from '../models'; // Your Sequelize User model

const router = Router();

router.post('/login', async (req, res) => {
  // 1. Zod Validation (Returns 400 if invalid)
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ 
      error: 'validation_failed', 
      details: parsed.error.format() 
    });
  }

  const { email, password } = parsed.data;

  try {
    // 2. Fetch user from database (Mock Sequelize call)
    // const user = await User.findOne({ where: { email } });

    // Mock validation block for demonstration
    const user = { id: 'user_123', email: 'test@test.com', passwordHash: '...', role: 'Admin', tenantId: 'tenant_1' };
    const isPasswordValid = true; // await bcrypt.compare(password, user.passwordHash);

    if (!user || !isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 3. Generate Tokens
    const accessToken = generateAccessToken(user.id, user.role, user.tenantId);
    const { token: refreshToken, family } = await generateRefreshToken(user.id);

    // 4. Return tokens to client
    res.json({
      accessToken,
      refreshToken,
      family,
      user: {
        id: user.id,
        role: user.role,
        tenantId: user.tenantId
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;