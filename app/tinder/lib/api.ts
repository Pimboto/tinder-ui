// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';
const AUTH_TOKEN = 'elmango10';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${AUTH_TOKEN}`
};

// API Service
export const api = {
  async get(endpoint: string) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
      return await response.json();
    } catch (error: unknown) {
      console.error(`Error fetching ${endpoint}:`, error);
      return { error: true, message: error instanceof Error ? error.message : String(error) };
    }
  },
  async post(endpoint: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error: unknown) {
      console.error(`Error posting to ${endpoint}:`, error);
      return { error: true, message: error instanceof Error ? error.message : String(error) };
    }
  }
};
