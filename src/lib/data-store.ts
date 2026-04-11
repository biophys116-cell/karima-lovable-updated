import * as API from './api-client';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'customer' | 'admin';
  token?: string;
  createdAt: string;
}

export interface Package {
  id: string;
  title: string;
  category: 'umrah' | 'hajj' | 'ziyarat';
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  image: string;
  highlights: string[];
  includes: string[];
  rating: number;
  featured: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  packageId: string;
  packageTitle: string;
  fullName: string;
  email: string;
  phone: string;
  travelDate: string;
  passengers: number;
  specialRequests: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
}

// Default packages
const defaultPackages: Package[] = [
  {
    id: 'umrah-economy',
    title: 'Umrah Economy Package',
    category: 'umrah',
    description: 'An affordable journey to the Holy Land with essential services included.',
    longDescription: 'Experience the spiritual journey of Umrah with our economy package. This carefully curated package includes comfortable accommodation near the Haram, guided rituals, and all necessary transportation. Perfect for those seeking a meaningful pilgrimage experience.',
    price: 1299,
    duration: '10 Days / 9 Nights',
    image: 'kaaba',
    highlights: ['Visa Processing', 'Return Flights', '3-Star Hotel near Haram', 'Ground Transport', 'Guided Umrah Rituals'],
    includes: ['Accommodation', 'Flights', 'Visa', 'Transport', 'Guide'],
    rating: 4.5,
    featured: true,
  },
  {
    id: 'umrah-premium',
    title: 'Umrah Premium Package',
    category: 'umrah',
    description: 'A luxurious Umrah experience with 5-star accommodation and VIP services.',
    longDescription: 'Indulge in the ultimate spiritual journey with our premium Umrah package. Stay in 5-star hotels with Haram views, enjoy private transportation, and receive personalized guidance throughout your pilgrimage.',
    price: 2999,
    duration: '14 Days / 13 Nights',
    image: 'kaaba',
    highlights: ['VIP Visa Processing', 'Business Class Flights', '5-Star Haram View Hotel', 'Private Transport', 'Personal Guide', 'Ziyarat Tours'],
    includes: ['Luxury Accommodation', 'Business Flights', 'Visa', 'Private Car', 'Personal Guide', 'Meals'],
    rating: 4.9,
    featured: true,
  },
  {
    id: 'hajj-standard',
    title: 'Hajj Standard Package',
    category: 'hajj',
    description: 'Complete Hajj package with all rituals covered and comfortable stay.',
    longDescription: 'Fulfill the fifth pillar of Islam with our comprehensive Hajj package. We handle everything from visa processing to accommodation in Mina, Arafat, and Muzdalifah, ensuring you can focus entirely on your spiritual journey.',
    price: 5499,
    duration: '21 Days / 20 Nights',
    image: 'kaaba',
    highlights: ['Hajj Visa', 'Return Flights', '4-Star Hotels', 'Mina Tent Accommodation', 'All Ground Transport', 'Experienced Scholars'],
    includes: ['Hotels', 'Flights', 'Visa', 'Mina/Arafat Camp', 'Transport', 'Meals', 'Guide'],
    rating: 4.7,
    featured: true,
  },
  {
    id: 'hajj-vip',
    title: 'Hajj VIP Experience',
    category: 'hajj',
    description: 'The ultimate Hajj experience with luxury at every step.',
    longDescription: 'Our VIP Hajj package offers an unparalleled pilgrimage experience. From first-class flights to premium Mina camps with air conditioning, every detail is crafted for your comfort and spiritual fulfillment.',
    price: 9999,
    duration: '25 Days / 24 Nights',
    image: 'kaaba',
    highlights: ['Premium Hajj Visa', 'First Class Flights', '5-Star Hotels', 'VIP Mina Camp', 'Private Transport', 'Scholar Guidance', 'Full Board Meals'],
    includes: ['Luxury Hotels', 'First Class Flights', 'Visa', 'VIP Camp', 'Private Car', 'Gourmet Meals', 'Personal Scholar'],
    rating: 5.0,
    featured: false,
  },
  {
    id: 'ziyarat-iran',
    title: 'Iran Ziyarat Tour',
    category: 'ziyarat',
    description: 'Visit the sacred shrines of Mashhad, Qom, and Isfahan.',
    longDescription: 'Embark on a deeply spiritual journey through Iran, visiting the magnificent shrine of Imam Reza in Mashhad, the holy city of Qom, and the breathtaking architecture of Isfahan. This tour combines spiritual enrichment with cultural exploration.',
    price: 1899,
    duration: '12 Days / 11 Nights',
    image: 'ziyarat',
    highlights: ['Iran Visa', 'Domestic Flights', '4-Star Hotels', 'Shrine Visits', 'Historical Tours', 'Local Cuisine'],
    includes: ['Accommodation', 'Flights', 'Visa', 'Transport', 'Guide', 'Meals'],
    rating: 4.6,
    featured: true,
  },
  {
    id: 'ziyarat-iraq',
    title: 'Iraq Ziyarat Package',
    category: 'ziyarat',
    description: 'Sacred journey to Karbala, Najaf, and other holy sites in Iraq.',
    longDescription: 'Visit the sacred cities of Karbala and Najaf, home to the shrines of Imam Hussain and Imam Ali. This spiritually enriching tour includes visits to all major holy sites with knowledgeable guides.',
    price: 1599,
    duration: '10 Days / 9 Nights',
    image: 'ziyarat',
    highlights: ['Iraq Visa', 'Return Flights', 'Hotel Accommodation', 'Karbala & Najaf Visits', 'All Shrine Tours', 'Guided Experience'],
    includes: ['Hotels', 'Flights', 'Visa', 'Transport', 'Guide', 'Some Meals'],
    rating: 4.8,
    featured: false,
  },
];

// Default admin user initialized from environment variables
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@karimaahlebait.com';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

const defaultUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Admin',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

// LocalStorage helpers
const KEYS = {
  users: 'safari_users',
  packages: 'safari_packages',
  bookings: 'safari_bookings',
  currentUser: 'safari_current_user',
};

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Initialize data
export function initializeData(): void {
  if (!localStorage.getItem(KEYS.packages)) {
    setItem(KEYS.packages, defaultPackages);
  }
  // Ensure admin user always exists with correct credentials
  const users = getItem<User[]>(KEYS.users, []);
  const adminExists = users.find(u => u.email === 'admin@karimaahlebait.com' && u.role === 'admin');
  if (users.length === 0) {
    setItem(KEYS.users, defaultUsers);
  } else if (!adminExists) {
    const filtered = users.filter(u => u.role !== 'admin');
    filtered.push(defaultUsers[0]);
    setItem(KEYS.users, filtered);
  }
  if (!localStorage.getItem(KEYS.bookings)) {
    setItem(KEYS.bookings, []);
  }
}

// Auth - Using Backend API with fallback to localStorage
/**
 * Login user with credentials validation
 * Tries backend API first, falls back to localStorage for development
 * @returns User if successful, null if credentials invalid
 */
export async function login(email: string, password: string): Promise<User | null> {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Try backend API first
    try {
      const response = await API.loginAPI(email, password);
      console.log('📡 Backend login response:', response);
      
      // Backend returns {message, token, user: {...}}
      const userData = (response as any).user || response;
      
      const user: User = {
        id: userData.id || (userData as any)._id,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'customer',
        token: response.token || (response as any).user?.token,
        createdAt: userData.createdAt || new Date().toISOString(),
      };
      console.log('✅ Extracted user data:', user);
      setItem(KEYS.currentUser, user);
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      console.log('✅ Backend login successful:', email);
      return user;
    } catch (apiError) {
      console.warn('⚠️ Backend API unavailable, using localStorage:', apiError);
      
      // Fallback to localStorage for development
      const users = getItem<User[]>(KEYS.users, []);
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        console.warn('⚠️ Login failed for email:', email);
        return null;
      }

      setItem(KEYS.currentUser, user);
      console.log('✅ Local login successful:', email);
      return user;
    }
  } catch (error) {
    console.error('❌ Login error:', error);
    throw error;
  }
}

/**
 * Register a new user with validation
 * Uses backend API when available, falls back to localStorage
 * @throws Error if email already exists or validation fails
 */
export async function register(name: string, email: string, password: string): Promise<User | null> {
  try {
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Try backend API first
    try {
      const response = await API.registerAPI(name, email, password);
      console.log('📡 Backend register response:', response);
      
      // Backend returns {message, user: {...}}
      const userData = (response as any).user || response;
      
      const user: User = {
        id: userData.id || (userData as any)._id,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'customer',
        token: response.token || (response as any).user?.token,
        createdAt: userData.createdAt || new Date().toISOString(),
      };
      console.log('✅ Extracted user data:', user);
      setItem(KEYS.currentUser, user);
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      console.log('✅ Backend registration successful:', email);
      return user;
    } catch (apiError) {
      console.warn('⚠️ Backend API unavailable, using localStorage:', apiError);
      
      // Fallback to localStorage for development
      const users = getItem<User[]>(KEYS.users, []);
      if (users.find(u => u.email === email)) {
        console.warn('⚠️ User already exists:', email);
        return null;
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      setItem(KEYS.users, users);
      setItem(KEYS.currentUser, newUser);
      
      console.log('✅ Local registration successful:', email);
      return newUser;
    }
  } catch (error) {
    console.error('❌ Registration failed:', error);
    throw new Error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function getCurrentUser(): User | null {
  return getItem<User | null>(KEYS.currentUser, null);
}

export async function logout(): Promise<void> {
  try {
    const user = getCurrentUser();
    
    // Try backend API first
    if (user?.token) {
      try {
        await API.logoutAPI();
        console.log('✅ Backend logout successful');
      } catch (apiError) {
        console.warn('⚠️ Backend logout failed:', apiError);
      }
    }
    
    // Clear local data
    localStorage.removeItem(KEYS.currentUser);
    localStorage.removeItem('authToken');
    console.log('✅ Logout complete');
  } catch (error) {
    console.error('❌ Logout error:', error);
    throw error;
  }
}

// Packages
export function getPackages(): Package[] {
  return getItem<Package[]>(KEYS.packages, defaultPackages);
}

export function getPackageById(id: string): Package | undefined {
  return getPackages().find(p => p.id === id);
}

export function getPackagesByCategory(category: string): Package[] {
  if (category === 'all') return getPackages();
  return getPackages().filter(p => p.category === category);
}

export function getFeaturedPackages(): Package[] {
  return getPackages().filter(p => p.featured);
}

// Bookings - Using Backend API with fallback to localStorage
export async function getBookings(): Promise<Booking[]> {
  try {
    // Try backend API first
    try {
      return await API.getBookingsAPI();
    } catch (apiError) {
      console.warn('⚠️ Backend API unavailable for getBookings, using localStorage:', apiError);
      
      // Fallback to localStorage
      return getItem<Booking[]>(KEYS.bookings, []);
    }
  } catch (error) {
    console.error('❌ Error getting bookings:', error);
    return [];
  }
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
  try {
    // Try backend API first
    try {
      return await API.getUserBookingsAPI(userId);
    } catch (apiError) {
      console.warn('⚠️ Backend API unavailable for getUserBookings, using localStorage:', apiError);
      
      // Fallback to localStorage
      return getItem<Booking[]>(KEYS.bookings, []).filter(b => b.userId === userId);
    }
  } catch (error) {
    console.error('❌ Error getting user bookings:', error);
    return [];
  }
}

export async function createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
  try {
    // Try backend API first
    try {
      console.log('📡 Sending booking to backend:', booking);
      const response = await API.createBookingAPI(booking);
      console.log('📡 Backend response:', response);
      
      // Backend returns { message, booking: {...} }
      const bookingData = (response as any).booking || response;
      
      const newBooking: Booking = {
        id: bookingData.id || bookingData._id,
        userId: bookingData.userId,
        packageId: bookingData.packageId,
        packageTitle: bookingData.packageTitle,
        fullName: bookingData.fullName,
        email: bookingData.email,
        phone: bookingData.phone,
        travelDate: bookingData.travelDate,
        passengers: bookingData.passengers,
        specialRequests: bookingData.specialRequests,
        status: bookingData.status,
        totalPrice: bookingData.totalPrice,
        createdAt: bookingData.createdAt,
      };
      console.log('✅ Backend booking created:', newBooking);
      return newBooking;
    } catch (apiError) {
      console.warn('⚠️ Backend API unavailable for createBooking, using localStorage:', apiError);
      
      // Fallback to localStorage
      const bookings = getItem<Booking[]>(KEYS.bookings, []);
      const newBooking: Booking = {
        ...booking,
        id: `booking-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      bookings.push(newBooking);
      setItem(KEYS.bookings, bookings);
      console.log('✅ Local booking created:', newBooking);
      return newBooking;
    }
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    throw error;
  }
}

export async function updateBookingStatus(id: string, status: Booking['status']): Promise<void> {
  try {
    // Try backend API first
    try {
      const response = await API.updateBookingAPI(id, { status });
      console.log('✅ Backend booking status updated:', id, status, response);
    } catch (apiError) {
      console.warn('⚠️ Backend API unavailable for updateBookingStatus, using localStorage:', apiError);
      
      // Fallback to localStorage
      const bookings = getItem<Booking[]>(KEYS.bookings, []);
      const idx = bookings.findIndex(b => b.id === id);
      if (idx >= 0) {
        bookings[idx].status = status;
        setItem(KEYS.bookings, bookings);
        console.log('✅ Local booking status updated:', id, status);
      }
    }
  } catch (error) {
    console.error('❌ Error updating booking status:', error);
    throw error;
  }
}

// Users (admin)
export function getAllUsers(): User[] {
  return getItem<User[]>(KEYS.users, []);
}
