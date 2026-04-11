const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Helper function to format booking response
function formatBooking(booking) {
  return {
    id: booking._id,
    userId: booking.userId,
    packageId: booking.packageId,
    packageTitle: booking.packageTitle,
    fullName: booking.fullName,
    email: booking.email,
    phone: booking.phone,
    travelDate: booking.travelDate,
    passengers: booking.passengers,
    specialRequests: booking.specialRequests,
    status: booking.status,
    totalPrice: booking.totalPrice,
    createdAt: booking.createdAt ? new Date(booking.createdAt).toISOString() : new Date().toISOString()
  };
}

// ==================== CREATE BOOKING ================
router.post("/", async (req, res) => {
  try {
    const { userId, packageId, packageTitle, fullName, email, phone, travelDate, passengers, specialRequests, totalPrice } = req.body;

    // Validation
    if (!userId || !packageId || !packageTitle || !fullName || !email || !phone || !travelDate || !passengers || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log('📡 Creating booking:', { userId, packageId, packageTitle, fullName, email });

    // Create booking
    const booking = new Booking({
      userId,
      packageId,
      packageTitle,
      fullName,
      email,
      phone,
      travelDate,
      passengers,
      specialRequests,
      totalPrice
    });

    await booking.save();
    console.log('✅ Booking saved to MongoDB:', booking._id);

    res.status(201).json({
      message: "Booking created successfully",
      booking: formatBooking(booking)
    });

  } catch (error) {
    console.error("❌ Booking creation error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== GET ALL BOOKINGS (Admin) ================
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    const formatted = bookings.map(b => formatBooking(b));
    console.log('✅ Retrieved all bookings:', formatted.length);
    res.json(formatted);
  } catch (error) {
    console.error('❌ Error getting bookings:', error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== GET USER BOOKINGS ================
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('📡 Fetching bookings for user:', userId);
    const bookings = await Booking.find({ userId });
    const formatted = bookings.map(b => formatBooking(b));
    console.log('✅ Retrieved user bookings:', formatted.length);
    res.json(formatted);
  } catch (error) {
    console.error('❌ Error getting user bookings:', error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== GET SINGLE BOOKING ================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(formatBooking(booking));
  } catch (error) {
    console.error('❌ Error getting booking:', error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== UPDATE BOOKING STATUS ================
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log('✅ Booking status updated:', id, status);
    res.json({
      message: "Booking updated successfully",
      booking: formatBooking(booking)
    });
  } catch (error) {
    console.error('❌ Error updating booking:', error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== DELETE BOOKING ================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log('✅ Booking deleted:', id);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error('❌ Error deleting booking:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
