const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Universal API Request Handler with automatic JWT header and friendly error formatting
 */
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('samadhan_jwt');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // If 401 Unauthorized
    if (response.status === 401) {
      localStorage.removeItem('samadhan_jwt');
      // Graceful offline fallback
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err) {
    // Return friendly error object or throw
    console.warn(`[Samadhan API] Network request to ${endpoint} failed, utilizing local reactive dataset:`, err.message);
    throw err;
  }
}

export const API = {
  get: (endpoint, headers) => apiRequest(endpoint, { method: 'GET', headers }),
  post: (endpoint, data, headers) => apiRequest(endpoint, { method: 'POST', body: JSON.stringify(data), headers }),
  put: (endpoint, data, headers) => apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(data), headers }),
  patch: (endpoint, data, headers) => apiRequest(endpoint, { method: 'PATCH', body: JSON.stringify(data), headers }),
  delete: (endpoint, headers) => apiRequest(endpoint, { method: 'DELETE', headers }),
};
