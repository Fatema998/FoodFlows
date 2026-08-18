const express = require('express');
const db = require('../db');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/orders', protect, async (req, res, next) => {
  try {
    const { restaurantId, items, address, paymentMethod = 'CARD' } = req.body;

    if (!restaurantId || !Array.isArray(items) || items.length === 0 || !address) {
      return res.status(400).json({ success: false, message: 'Invalid order payload.' });
    }

    const [restaurantRows] = await db.query('SELECT * FROM restaurants WHERE id = ? AND is_active = TRUE', [restaurantId]);
    if (restaurantRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    }

    const restaurant = restaurantRows[0];
    let totalPrice = 0;

    for (const item of items) {
      const [menuRows] = await db.query('SELECT * FROM menu_items WHERE id = ? AND is_available = TRUE', [item.id]);
      if (menuRows.length === 0) {
        return res.status(400).json({ success: false, message: `Menu item not found: ${item.id}` });
      }

      const menuItem = menuRows[0];
      totalPrice += Number(menuItem.price) * Number(item.quantity || 1);
    }

    const totalWithDelivery = Number(totalPrice) + Number(restaurant.delivery_fee || 0);

    const [orderResult] = await db.query(
      'INSERT INTO orders (user_id, restaurant_id, status, total_price, delivery_fee, address, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.userId, restaurantId, 'PLACED', totalWithDelivery, restaurant.delivery_fee || 0, address, paymentMethod]
    );

    for (const item of items) {
      const [menuRows] = await db.query('SELECT * FROM menu_items WHERE id = ? AND is_available = TRUE', [item.id]);
      const menuItem = menuRows[0];

      await db.query(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price, item_name) VALUES (?, ?, ?, ?, ?)',
        [orderResult.insertId, item.id, item.quantity || 1, menuItem.price, menuItem.name]
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully.',
      order: {
        id: orderResult.insertId,
        status: 'PLACED',
        totalPrice: totalWithDelivery,
        paymentMethod,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/orders', protect, async (req, res, next) => {
  try {
    const [orders] = await db.query(
      `SELECT o.*, r.name as restaurant_name
       FROM orders o
       JOIN restaurants r ON r.id = o.restaurant_id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [req.user.userId]
    );

    return res.json({ success: true, orders });
  } catch (error) {
    return next(error);
  }
});

router.get('/owner/orders', protect, authorizeRoles('RESTAURANT_OWNER'), async (req, res, next) => {
  try {
    const [orders] = await db.query(
      `SELECT o.*, r.name as restaurant_name
       FROM orders o
       JOIN restaurants r ON r.id = o.restaurant_id
       WHERE r.owner_id = ?
       ORDER BY o.created_at DESC`,
      [req.user.userId]
    );

    return res.json({ success: true, orders });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

