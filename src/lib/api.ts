// API utility functions for interacting with the Django backend

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Generic function to fetch data from the API
 */
export const fetchFromAPI = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching from API:', error);
    throw error;
  }
};

/**
 * Generic function to post data to the API
 */
export const postToAPI = async <T>(endpoint: string, data: Record<string, unknown>) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('Error posting to API:', error);
    throw error;
  }
};

// Specific API functions for different features

export const getPrograms = () => fetchFromAPI('get-programs/');

export const getNews = (category?: string) => {
  const endpoint = category 
    ? `get-news/?category=${encodeURIComponent(category)}` 
    : 'get-news/';
  return fetchFromAPI(endpoint);
};

export const getLibraryItems = (type?: string) => {
  const endpoint = type 
    ? `get-library-items/?type=${encodeURIComponent(type)}` 
    : 'get-library-items/';
  return fetchFromAPI(endpoint);
};

export const submitContactForm = (formData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  return postToAPI('submit-contact/', formData);
};

export const submitDonation = (donationData: {
  name: string;
  email: string;
  amount: number;
  payment_method: string;
  message?: string;
  is_monthly: boolean;
}) => {
  return postToAPI('submit-donation/', donationData);
};

export const submitVolunteerForm = (volunteerData: {
  name: string;
  email: string;
  phone: string;
  address: string;
  skills: string;
  availability: string;
}) => {
  return postToAPI('submit-volunteer/', volunteerData);
};