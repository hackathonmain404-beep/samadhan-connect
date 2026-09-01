const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Universal API Request Handler with automatic JWT header and FormData support
 */
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('samadhan_jwt');

  const headers = {
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // Only add Content-Type: application/json if body is NOT FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // If 401 Unauthorized
    if (response.status === 401) {
      localStorage.removeItem('samadhan_jwt');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || errorData.error || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err) {
    console.warn(`[Samadhan API] Request to ${endpoint} failed:`, err.message);
    throw err;
  }
}

export const API = {
  get: (endpoint, headers) => apiRequest(endpoint, { method: 'GET', headers }),
  post: (endpoint, data, headers) =>
    apiRequest(endpoint, {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
      headers,
    }),
  put: (endpoint, data, headers) =>
    apiRequest(endpoint, {
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
      headers,
    }),
  patch: (endpoint, data, headers) =>
    apiRequest(endpoint, {
      method: 'PATCH',
      body: data instanceof FormData ? data : JSON.stringify(data),
      headers,
    }),
  delete: (endpoint, headers) => apiRequest(endpoint, { method: 'DELETE', headers }),
  upload: (endpoint, formData, headers) =>
    apiRequest(endpoint, {
      method: 'POST',
      body: formData,
      headers,
    }),
};
