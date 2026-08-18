const express = require('express');
const db = require('../db');

const router = express.Router();

// Search restaurants and menu items
router.get('/', async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    // 1. Validate search query
    if (!q || typeof q !== 'string' || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query "q" is required and must be a valid string.'
      });
    }

    const sanitizedQuery = q.trim();
    const searchQuery = `%${sanitizedQuery}%`;

    // Calculate pagination offsets safely
    const parsedLimit = Math.max(1, parseInt(limit, 10) || 10);
    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const restaurantLimit = parsedLimit;
    const menuLimit = parsedLimit * 2; // Giving slightly higher weight to menu items
    const restaurantOffset = (parsedPage - 1) * restaurantLimit;
    const menuOffset = (parsedPage - 1) * menuLimit;

    // 2. Fetch restaurants with pagination
    // Note: Using connection.query with mysql2 placeholder array automatically escapes inputs, preventing SQL injection.
    const [restaurants] = await db.query(
      `SELECT id, name, cuisine, description, image, rating, delivery_fee, delivery_time, 'restaurant' as type
       FROM restaurants
       WHERE is_active = TRUE 
         AND (name LIKE ? OR cuisine LIKE ? OR description LIKE ?)
       LIMIT ? OFFSET ?`,
      [searchQuery, searchQuery, searchQuery, restaurantLimit, restaurantOffset]
    );

    // 3. Fetch menu items with pagination and joined restaurant names
    const [menuItems] = await db.query(
      `SELECT m.id, m.restaurant_id, m.name, m.description, m.price, m.category, m.image, 'menu_item' as type,
              r.name as restaurant_name
       FROM menu_items m
       JOIN restaurants r ON m.restaurant_id = r.id
       WHERE m.is_available = TRUE 
         AND r.is_active = TRUE 
         AND (m.name LIKE ? OR m.description LIKE ? OR m.category LIKE ?)
       LIMIT ? OFFSET ?`,
      [searchQuery, searchQuery, searchQuery, menuLimit, menuOffset]
    );

    // 4. Return structured response
    return res.json({
      success: true,
      meta: {
        query: sanitizedQuery,
        page: parsedPage,
        limit: parsedLimit
      },
      results: {
        restaurants,
        menuItems
      }
    });

  } catch (error) {
    // Passes error to your global Express error handler middleware
    return next(error);
  }
});

module.exports = router;