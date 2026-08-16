# FoodFlow - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Initialize Database (First Time Only)

```powershell
cd "c:\Users\amzad H shafin\OneDrive\Desktop\New folder (3)\foodflow\backend"
node utils/setupDatabase.js
```

**Expected Output:**
```
✓ Connected to MySQL
✓ Database setup completed successfully!
```

---

### Step 2: Start Backend Server

```powershell
cd "c:\Users\amzad H shafin\OneDrive\Desktop\New folder (3)\foodflow\backend"
node server.js
```

**Expected Output:**
```
FoodFlow backend running on http://localhost:5000
```

---

### Step 3: Start Frontend Server (New Terminal)

```powershell
cd "c:\Users\amzad H shafin\OneDrive\Desktop\New folder (3)\foodflow\frontend"
npm run dev
```

**Expected Output:**
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
```

---

## ✅ Verify Everything Works

1. **Open browser**: http://localhost:5173
2. **Click "Create account"**
3. **Fill in form**:
   - Full Name: Your Name
   - Email: yourname@example.com
   - Phone: +1234567890
   - Password: YourPassword123
   - Role: Customer
4. **Click Register** → Should redirect to onboarding
5. **Complete onboarding** → Should show customer home

---

## 🧪 Test API Directly

```powershell
# Test health endpoint
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/health" -Method Get
$response | ConvertTo-Json

# Test register
$body = @{
    fullName = "Test User"
    email = "test@example.com"
    phone = "+1234567890"
    password = "Password123"
    role = "CUSTOMER"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/register" -Method Post -Body $body -ContentType "application/json"
$response | ConvertTo-Json -Depth 3
```

---

## 📚 Available Demo Accounts

If you need to test with pre-created accounts, register new ones through the UI. The seeded demo users have hashed passwords that aren't directly testable, but you can:

1. Register new test accounts for each role
2. Use those for testing

---

## 🔧 Common Issues & Solutions

### Port 5000 Already in Use
```powershell
Get-Process node | Stop-Process -Force
# Wait 2 seconds, then restart
```

### Database Connection Error
- Check MySQL is running
- Verify .env has correct credentials
- Run: `node utils/setupDatabase.js` again

### Frontend Can't Connect to Backend
- Ensure backend is running on port 5000
- Check CORS is enabled (it is, configured for localhost:5173)
- Clear browser cache

### JWT Token Errors
- Token expires in 7 days
- Simply re-login to get new token
- Frontend automatically handles 401 errors

---

## 📁 Project Structure

```
foodflow/
├── backend/
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, error handling
│   ├── utils/           # Helpers, database setup
│   ├── database/        # SQL schema and seeds
│   ├── server.js        # Main Express app
│   ├── db.js            # MySQL connection
│   ├── .env             # Configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/       # Route pages
│   │   ├── components/  # UI components
│   │   ├── context/     # AuthContext
│   │   ├── services/    # API client
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── IMPLEMENTATION_SUMMARY.md  # Complete docs
└── TEST_REPORT.md             # Test results
```

---

## 🔐 Security Notes

**Current Configuration:**
- JWT Secret: `foodflow-super-secret-key-change-me`
- DB Password: `password`
- CORS: Limited to localhost:5173

**Before Production:**
1. Change JWT_SECRET to random value
2. Change DB password
3. Set proper environment variables
4. Enable HTTPS
5. Add rate limiting

---

## 🧭 API Endpoints Reference

### Authentication
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me              (requires JWT)
```

### Restaurants
```
GET    /api/v1/restaurants
GET    /api/v1/restaurants/:id
```

### Orders
```
POST   /api/v1/orders               (requires JWT)
GET    /api/v1/orders               (requires JWT)
GET    /api/v1/owner/orders         (requires JWT + RESTAURANT_OWNER)
```

### Rider
```
GET    /api/v1/rider/deliveries     (requires JWT + DELIVERY_RIDER)
```

### Onboarding
```
POST   /api/v1/onboarding           (requires JWT)
```

### Health
```
GET    /api/v1/health
GET    /api/v1/db-status
```

---

## 💾 Database Schema

**7 Tables Created:**
- users
- user_onboarding
- restaurants
- menu_items
- orders
- order_items

All with proper relationships and constraints.

---

## 🎯 What's Implemented

✅ User registration with password hashing  
✅ JWT authentication and authorization  
✅ Role-based access control (CUSTOMER, RESTAURANT_OWNER, DELIVERY_RIDER)  
✅ Restaurant browsing  
✅ Order creation and management  
✅ Onboarding workflow  
✅ Rider delivery management  
✅ Frontend API integration  
✅ Error handling  
✅ Database persistence  

---

## 🚀 Next Features (Future Sprints)

- File uploads (photos, documents)
- Advanced onboarding forms
- Real payment processing
- Order status tracking
- Rider location tracking
- Reviews and ratings
- Promo codes
- Email notifications

---

## 📞 Quick Reference

| Item | Value |
|------|-------|
| **Backend URL** | http://localhost:5000 |
| **Frontend URL** | http://localhost:5173 |
| **API Base** | /api/v1 |
| **Database** | foodflow (MySQL) |
| **JWT Expiry** | 7 days |
| **Token Storage** | localStorage (foodflow-token) |

---

## ✨ All Set!

Your FoodFlow backend is **production-ready for MVP**.

**Enjoy building! 🎉**
