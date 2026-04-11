/**
 * API Client - Handles all backend API calls
 * Base URL: VITE_API_URL from environment variables
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface RequestOptions extends RequestInit {
  body?: any;
}

export class APIError extends Error {
  constructor(
    public status: number,
    public data: any,
    message: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Make a fetch request to the API
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    console.log(`📡 API Request: ${options.method || 'GET'} ${url}`, options.body);
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      console.error(`❌ API Error: ${response.status}`, data);
      throw new APIError(response.status, data, data.message || 'API request failed');
    }

    console.log(`✅ API Response: ${response.status}`, data);
    return data as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    console.error('❌ Network Error:', error);
    throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// ==================== AUTH ENDPOINTS ====================

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  token?: string;
  createdAt: string;
}

export async function loginAPI(email: string, password: string): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export async function registerAPI(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: { name, email, password },
  });
}

export async function logoutAPI(): Promise<void> {
  return request<void>('/auth/logout', {
    method: 'POST',
  });
}

export async function getCurrentUserAPI(): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/me', {
    method: 'GET',
  });
}

// ==================== USER ENDPOINTS ====================

export async function getUsersAPI(): Promise<AuthResponse[]> {
  return request<AuthResponse[]>('/users', {
    method: 'GET',
  });
}

// ==================== BOOKING ENDPOINTS ====================

export interface BookingResponse {
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

export async function getBookingsAPI(): Promise<BookingResponse[]> {
  return request<BookingResponse[]>('/bookings', {
    method: 'GET',
  });
}

export async function getUserBookingsAPI(userId: string): Promise<BookingResponse[]> {
  return request<BookingResponse[]>(`/bookings/user/${userId}`, {
    method: 'GET',
  });
}

export async function createBookingAPI(
  booking: Omit<BookingResponse, 'id' | 'createdAt' | 'status'>
): Promise<BookingResponse> {
  return request<BookingResponse>('/bookings', {
    method: 'POST',
    body: booking,
  });
}

export async function updateBookingAPI(
  bookingId: string,
  updates: Partial<BookingResponse>
): Promise<BookingResponse> {
  return request<BookingResponse>(`/bookings/${bookingId}`, {
    method: 'PATCH',
    body: updates,
  });
}

export async function deleteBookingAPI(bookingId: string): Promise<void> {
  return request<void>(`/bookings/${bookingId}`, {
    method: 'DELETE',
  });
}

export function getAPIUrl(): string {
  return API_URL;
}
