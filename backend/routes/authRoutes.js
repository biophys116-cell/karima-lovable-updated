const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");

// ==================== AUTH LOGGING SYSTEM ====================
const logsDir = path.join(__dirname, "../logs");
const logFilePath = path.join(logsDir, "auth_logs.json");

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Read auth logs
function readAuthLogs() {
  try {
    if (fs.existsSync(logFilePath)) {
      const data = fs.readFileSync(logFilePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("❌ Error reading logs:", error);
  }
  return [];
}

// Write auth logs (append mode)
function appendAuthLog(logEntry) {
  try {
    const logs = readAuthLogs();
    logs.push(logEntry);
    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), "utf-8");
    console.log(`✅ Auth log saved: ${logEntry.action} - ${logEntry.email}`);
  } catch (error) {
    console.error("❌ Error writing logs:", error);
  }
}

// Log user login
function logLogin(userId, email, userName) {
  appendAuthLog({
    id: `log_${Date.now()}`,
    userId,
    email,
    userName,
    action: "LOGIN",
    loginTime: new Date().toISOString(),
    logoutTime: null,
    duration: null,
  });
}

// Log user logout
function logLogout(userId, email) {
  const logs = readAuthLogs();
  const lastLogin = logs.reverse().find(log => log.userId === userId && log.action === "LOGIN" && !log.logoutTime);
  
  if (lastLogin) {
    const loginTime = new Date(lastLogin.loginTime);
    const logoutTime = new Date();
    const duration = Math.round((logoutTime - loginTime) / 1000);
    
    lastLogin.logoutTime = logoutTime.toISOString();
    lastLogin.duration = `${Math.floor(duration / 60)}m ${duration % 60}s`;
    lastLogin.action = "LOGIN_SESSION";
    
    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), "utf-8");
    console.log(`✅ Logout logged: ${email} | Session: ${lastLogin.duration}`);
  }
}

// ==================== SIGNUP ================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn('⚠️ User already exists:', email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log('✅ User saved to MongoDB:', user._id, email);

    res.status(201).json({
      message: "User created successfully",
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: 'customer',
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== LOGIN ================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user
    console.log('📡 Looking up user:', email);
    const user = await User.findOne({ email });
    if (!user) {
      console.warn('⚠️ User not found:', email);
      return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log('✅ User found in MongoDB:', user._id, email);

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn('⚠️ Password mismatch:', email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey123",
      { expiresIn: "7d" }
    );

    // Log the login event
    logLogin(user._id, email, user.name);
    console.log('✅ User logged in successfully:', email);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== LOGOUT ================
router.post("/logout", (req, res) => {
  try {
    const { userId, email } = req.body;

    if (userId && email) {
      logLogout(userId, email);
    }

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("❌ Logout error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== GET AUTH LOGS (Admin Only) ================
router.get("/logs", async (req, res) => {
  try {
    const logs = readAuthLogs();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
