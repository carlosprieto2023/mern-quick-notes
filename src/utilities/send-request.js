import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
  // Initialize options object with the HTTP method
  const options = { method };

  // Add Content-Type header and body if payload is provided
  if (payload) {
    // Ensure headers is initialized properly
    options.headers = {
      'Content-Type': 'application/json',
      ...options.headers, // Merge existing headers if any
    };
    options.body = JSON.stringify(payload);
  }

  // Get token if available and add Authorization header
  const token = getToken();
  if (token) {
    // Merge Authorization header
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    // Send the HTTP request using fetch API
    const res = await fetch(url, options);

    // If the request was successful (status 2xx), return the parsed JSON response
    if (res.ok) {
      // Only parse JSON if the response is valid
      return res.json();
    }

    // If the request failed, throw an error with the response details
    const error = await res.json().catch(() => ({
      message: 'An unknown error occurred',
    })); // Catch any issues with parsing the error response
    throw new Error(error.message || 'Bad Request');
  } catch (error) {
    // Log the error and rethrow it for further handling
    console.error('Request failed:', error);
    throw error;
  }
}
