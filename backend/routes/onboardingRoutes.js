const express = require('express');
const db = require('../db');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, async (req, res, next) => {
  try {
    const { role, formData } = req.body;

    if (!role || !['CUSTOMER', 'RESTAURANT_OWNER', 'DELIVERY_RIDER'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Valid role is required.' });
    }

    const payload = JSON.stringify(formData || {});

    await db.query(
      `INSERT INTO user_onboarding (user_id, role, payload)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE payload = VALUES(payload)`,
      [req.user.userId, role, payload]
    );

    await db.query(
      'UPDATE users SET is_onboarding_completed = TRUE WHERE id = ?',
      [req.user.userId]
    );

    return res.status(200).json({
      success: true,
      message: 'Onboarding completed successfully.',
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
