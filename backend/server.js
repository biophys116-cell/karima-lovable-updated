const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Booking routes (handles all booking operations)
app.use("/api/bookings", require("./routes/bookingRoutes"));


// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Verification endpoint - check data in MongoDB
app.get("/api/verify-data", async (req, res) => {
  try {
    const User = require("./models/User");
    const Booking = require("./models/Booking");
    
    const users = await User.find().select("_id name email createdAt");
    const bookings = await Booking.find().select("_id userId fullName email packageTitle status createdAt");
    
    res.json({
      message: "Data verification",
      summary: {
        totalUsers: users.length,
        totalBookings: bookings.length
      },
      users: users.slice(0, 5),
      bookings: bookings.slice(0, 10),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Verification error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
