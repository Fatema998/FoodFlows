const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [restaurants] = await db.query(
      `SELECT r.*, u.full_name AS owner_name
       FROM restaurants r
       JOIN users u ON u.id = r.owner_id
       WHERE r.is_active = TRUE
       ORDER BY r.created_at DESC`
    );

    return res.json({ success: true, restaurants });
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.id);
    const [restaurantRows] = await db.query('SELECT * FROM restaurants WHERE id = ? AND is_active = TRUE', [restaurantId]);

    if (restaurantRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    }

    const restaurant = restaurantRows[0];
    const [menuItems] = await db.query('SELECT * FROM menu_items WHERE restaurant_id = ? AND is_available = TRUE', [restaurantId]);

    return res.json({
      success: true,
      restaurant: {
        ...restaurant,
        menuItems,
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
