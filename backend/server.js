const dotenv = require("dotenv");

// IMPORTANT:
// Load .env BEFORE importing files that use process.env
dotenv.config();

const express = require("express");
const cors = require("cors");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const onboardingRoutes = require("./routes/onboardingRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const riderRoutes = require("./routes/riderRoutes");
const searchRoutes = require("./routes/searchRoutes");

const testConnection = require("./utils/testConnection");

const app = express();

const PORT = process.env.PORT || 5000;

// ===============================
// Middleware
// ===============================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ===============================
// Health Check
// ===============================

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "FoodFlow API is running",
    timestamp: new Date().toISOString(),
  });
});

// ===============================
// Database Status
// ===============================

app.get("/api/v1/db-status", async (req, res) => {
  try {
    const status = await testConnection();

    res.status(status.ok ? 200 : 503).json({
      success: status.ok,
      ...status,
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// ===============================
// API Routes
// ===============================

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/onboarding", onboardingRoutes);

app.use("/api/v1/restaurants", restaurantRoutes);

app.use("/api/v1", orderRoutes);

app.use("/api/v1/rider", riderRoutes);

app.use("/api/v1/search", searchRoutes);

// ===============================
// Error Handling
// ===============================

app.use(notFound);

app.use(errorHandler);

// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
  console.log(
    `FoodFlow backend running on http://localhost:${PORT}`
  );
});