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
      message: 'Thank you for your enquiry. We will be in touch shortly.',
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
 * Submit quote request data to the API
 * @param {Object} quoteData - The quote request data
 * @returns {Promise<Object>} - The API response
 */
export async function submitQuoteRequest(quoteData) {
  if (!API_URL) {
    // Development fallback - simulate success
    console.warn('API_URL not configured. Simulating quote submission.');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      success: true,
      message: 'Thank you for your quote request. We will be in touch shortly.',
      enquiryId: `dev-${Date.now()}`,
    };
  }

  const response = await fetch(`${API_URL}/api/quote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quoteData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.message || 'Failed to submit quote request', data.errors);
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
