import { RESPONSE_PROMISE } from '../config/site';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Submit contact form data to the API
 * @param {Object} formData - The form data to submit
 * @returns {Promise<Object>} - The API response
 */
export async function submitContactForm(formData) {
  if (!API_URL) {
    // Development fallback - simulate success
    console.warn('API_URL not configured. Simulating form submission.');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      success: true,
      message: `Thanks for reaching out. We'll get back to you ${RESPONSE_PROMISE}.`,
      enquiryId: `dev-${Date.now()}`,
    };
  }

  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.message || 'Failed to submit form', data.errors);
  }

  return data;
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = 'ApiError';
    this.errors = errors;
  }
}
