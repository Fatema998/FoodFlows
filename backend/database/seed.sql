USE foodflow;

INSERT INTO users (full_name, email, phone, password_hash, role, is_onboarding_completed)
VALUES
('Demo Customer', 'customer@foodflow.app', '+1234567890', '$2a$10$Tj4S7M6Dlb5n6YVv4Ex2mubg9Q3KnkzUk6c8gd3u5oLT4xiP1Z8aC', 'CUSTOMER', TRUE),
('Demo Owner', 'owner@foodflow.app', '+1234567891', '$2a$10$Tj4S7M6Dlb5n6YVv4Ex2mubg9Q3KnkzUk6c8gd3u5oLT4xiP1Z8aC', 'RESTAURANT_OWNER', TRUE),
('Demo Rider', 'rider@foodflow.app', '+1234567892', '$2a$10$Tj4S7M6Dlb5n6YVv4Ex2mubg9Q3KnkzUk6c8gd3u5oLT4xiP1Z8aC', 'DELIVERY_RIDER', TRUE)
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO restaurants (owner_id, name, cuisine, description, image, delivery_fee, delivery_time, rating)
VALUES
(2, 'Saffron Bites', 'Bangladeshi • Grill', 'Authentic comfort food and grilled classics.', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', 0.00, '18-25 min', 4.9),
(2, 'Green Bowl', 'Healthy • Vegan', 'Fresh bowls and nourishing daily meals.', 'https://images.unsplash.com/photo-1544025162-d76694265947', 2.49, '20-30 min', 4.8),
(2, 'Tokyo Feast', 'Japanese • Sushi', 'Premium sushi and modern Asian favorites.', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c', 3.99, '25-35 min', 4.9)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO menu_items (restaurant_id, name, description, price, category, image)
VALUES
(1, 'Crispy Chicken Burger', 'Fired chicken burger with slaw and sauce.', 16.50, 'Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'),
(1, 'Beef Kebab Platter', 'Served with naan, salad, and mint dip.', 19.00, 'Grill', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'),
(2, 'Spicy Prawn Bowl', 'Rice bowl with prawns, greens, and quinoa.', 18.00, 'Healthy', 'https://images.unsplash.com/photo-1547592180-85f173990554'),
(2, 'Avocado Crunch Salad', 'Fresh greens, avocado, seeds, and citrus vinaigrette.', 14.50, 'Salads', 'https://images.unsplash.com/photo-1546793665-c74683f339c1'),
(3, 'Salmon Crunch Roll', 'Crispy salmon roll with sesame and sauce.', 21.00, 'Sushi', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c'),
(3, 'Miso Ramen', 'Rich miso broth with noodles and vegetables.', 18.50, 'Noodles', 'https://images.unsplash.com/photo-1557872943-16a5ac26437e')
ON DUPLICATE KEY UPDATE name = VALUES(name);
