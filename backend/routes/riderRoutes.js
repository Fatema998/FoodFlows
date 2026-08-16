const express = require('express');
const db = require('../db');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/deliveries', protect, authorizeRoles('DELIVERY_RIDER'), async (req, res, next) => {
  try {
    const [orders] = await db.query(
      `SELECT o.*, r.name as restaurant_name
       FROM orders o
       JOIN restaurants r ON r.id = o.restaurant_id
       WHERE o.status IN ('CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'ON_THE_WAY')
       ORDER BY o.created_at DESC
       LIMIT 10`
    );

    return res.json({ success: true, deliveries: orders });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
