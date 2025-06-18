import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure:\n' +
    '- VITE_SUPABASE_URL is set to your Supabase project URL\n' +
    '- VITE_SUPABASE_ANON_KEY is set to your Supabase anon key\n' +
    'Then restart your development server.'
  );
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch {
  throw new Error(`Invalid Supabase URL: ${supabaseUrl}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to register a new user
export async function registerUser(userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  graduationYear?: number;
  degreeProgram?: string;
  currentPosition?: string;
  currentLocation?: string;
  membershipType: string;
}) {
  try {
    // For now, we'll use the Express backend instead of Supabase
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

// Helper function to get user profile
export async function getUserProfile(userId: string) {
  try {
    const response = await fetch(`http://localhost:5000/api/users/profile`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

// Helper function to update user profile
export async function updateUserProfile(userId: string, updates: Partial<{
  first_name: string;
  last_name: string;
  phone: string;
  current_position: string;
  current_location: string;
}>) {
  try {
    const response = await fetch(`http://localhost:5000/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

// Helper function to register for event
export async function registerForEvent(eventData: {
  userId: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  requirements?: string;
}) {
  try {
    const response = await fetch('http://localhost:5000/api/events/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Event registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
}

// Helper function to submit event idea
export async function submitEventIdea(ideaData: {
  userId: string;
  name: string;
  email: string;
  eventTitle: string;
  description: string;
  expectedDate: string;
  location: string;
  expectedAttendees: number;
}) {
  try {
    const response = await fetch('http://localhost:5000/api/events/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(ideaData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit event idea');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting event idea:', error);
    throw error;
  }
}