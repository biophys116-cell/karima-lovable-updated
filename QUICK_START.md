# ⚡ QUICK START - Copy Paste These Files

## 📁 Quick File Creation Checklist

### ✅ ALREADY DONE (For You)
- ✅ `backend/routes/authRoutes.js` - Updated with logging
- ✅ `backend/server.js` - Updated with booking routes
- ✅ `src/pages/Login.tsx` - Updated to async
- ✅ `src/components/Navbar.tsx` - Already correct

### 🔨 YOU NEED TO CREATE (5 Files)
jkhkj
---

## File 1: backend/models/Booking.js

Copy and create this file:

```javascript
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  packageId: String,
  packageTitle: String,
  fullName: String,
  email: String,
  phone: String,
  travelDate: Date,
  passengers: Number,
  specialRequests: String,
  totalPrice: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
```

---

## File 2: backend/routes/bookingRoutes.js

Copy and create this file:

```javascript
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
  try {
    const { userId, packageId, packageTitle, fullName, email, phone, travelDate, passengers, specialRequests, totalPrice } = req.body;

    if (!userId || !packageId || !email || !phone || !travelDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const booking = new Booking({
      userId,
      packageId,
      packageTitle,
      fullName,
      email,
      phone,
      travelDate: new Date(travelDate),
      passengers,
      specialRequests,
      totalPrice,
      status: 'pending',
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("❌ Booking error:", error);
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

---

## File 3: src/lib/api.ts

Copy and create this file:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

console.log("🌐 API Base URL:", API_BASE_URL);

// AUTH
export async function signupUser(name: string, email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return await response.json();
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  
  if (data.token) {
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  
  return data;
}

export async function logoutUser(userId: string, email: string) {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, email }),
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
}

export async function getAuthLogs() {
  const response = await fetch(`${API_BASE_URL}/auth/logs`);
  return await response.json();
}

// BOOKINGS
export async function createBooking(bookingData: any) {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || "Failed to create booking");
  }
  
  return data;
}

export async function getAllBookings() {
  const response = await fetch(`${API_BASE_URL}/bookings`);
  return await response.json();
}

export async function getUserBookings(userId: string) {
  const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`);
  return await response.json();
}

export async function getBooking(bookingId: string) {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);
  return await response.json();
}

export async function updateBooking(bookingId: string, updates: any) {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return await response.json();
}

export async function deleteBooking(bookingId: string) {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
    method: "DELETE",
  });
  return await response.json();
}

// USERS
export async function getAllUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  return await response.json();
}
```

---

## File 4: .env (in frontend root)

Create this file at: `<project-root>/.env`

```
VITE_API_URL=http://localhost:5000/api
```

---

## File 5: Update src/contexts/AuthContext.tsx

Replace entire file with:

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as authAPI from '@/lib/api';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (name: string, email: string, password: string) => Promise<User | null>;
  logout: () => void;
  isAdmin: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      setIsLoading(true);
      const response = await authAPI.loginUser(email, password);
      
      if (response.user) {
        setUser(response.user);
        return response.user;
      } else {
        toast.error(response.message || 'Login failed');
        return null;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<User | null> => {
    try {
      setIsLoading(true);
      
      if (!name.trim()) {
        toast.error('Name is required');
        return null;
      }

      const response = await authAPI.signupUser(name, email, password);
      
      if (response.user) {
        toast.success('Account created successfully!');
        return await login(email, password);
      } else {
        toast.error(response.message || 'Registration failed');
        return null;
      }
    } catch (error) {
      console.error('Register error:', error);
      toast.error('Registration failed. Email might already be registered.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (user) {
        await authAPI.logoutUser(user.id, user.email);
      }
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        🔄 Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAdmin: user?.role === 'admin',
      isLoggedIn: !!user,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
```

---

## ⚡ SETUP IN 5 MINUTES

1. **Create all 5 files** using code above
2. **Stop** current servers (Ctrl+C)
3. **Backend restart:**
   ```bash
   cd backend
   npm run dev
   ```
4. **Frontend restart** (new terminal):
   ```bash
   npm run dev
   ```
5. **Open:** `http://localhost:8081` ✓

---

## 🎯 WHAT NOW WORKS

✅ User registration/login tracked in `backend/logs/auth_logs.json`
✅ Bookings saved to MongoDB
✅ Frontend-backend fully integrated
✅ Error handling with toast notifications
✅ Logo links to homepage
✅ Clean modular code

---

## 📍 Where to Find Logs

**Auth logs:** `backend/logs/auth_logs.json` (auto-created on first login)
**Booking data:** MongoDB Atlas → Collections → Bookings

---

## 🔧 Still Need Help?

1. Check `IMPLEMENTATION_GUIDE.md` for detailed info
2. Check browser console (F12) for errors
3. Check `backend/logs/` for server activity
