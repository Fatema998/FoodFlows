const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const generateToken = require('../utils/generateToken');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { fullName, email, phone, password, role = 'CUSTOMER' } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!['CUSTOMER', 'RESTAURANT_OWNER', 'DELIVERY_RIDER'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role selected.' });
    }

    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'User already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (full_name, email, phone, password_hash, role, is_onboarding_completed) VALUES (?, ?, ?, ?, ?, false)',
      [fullName, email, phone, passwordHash, role]
    );

    const user = {
      id: result.insertId,
      fullName,
      email,
      phone,
      role,
      is_onboarding_completed: false,
    };

    return res.status(201).json({
      success: true,
      user,
      token: generateToken(result.insertId, role),
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const safeUser = {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      is_onboarding_completed: Boolean(user.is_onboarding_completed),
    };

    return res.json({
      success: true,
      user: safeUser,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/me', protect, async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.user.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const user = rows[0];

    return res.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        is_onboarding_completed: Boolean(user.is_onboarding_completed),
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
