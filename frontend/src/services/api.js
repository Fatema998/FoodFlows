import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  timeout: 10000,
});

// Add JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("foodflow-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses - clear token and redirect
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("foodflow-token");
      localStorage.removeItem("foodflow-auth");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: async (payload) => {
    try {
      const response = await api.post("/auth/register", payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Registration failed." };
    }
  },

  login: async (payload) => {
    try {
      const response = await api.post("/auth/login", payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed." };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Unable to fetch current user." };
    }
  },
};

export const onboardingApi = {
  saveOnboarding: async (payload) => {
    try {
      const response = await api.post("/onboarding", payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Unable to save onboarding data." };
    }
  },
};

export const restaurantApi = {
  getRestaurants: async () => {
    try {
      const response = await api.get("/restaurants");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Unable to fetch restaurants." };
    }
  },

  getRestaurant: async (id) => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Unable to fetch restaurant details." };
    }
  },
};

export const orderApi = {
  createOrder: async (payload) => {
    try {
      const response = await api.post("/orders", payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Unable to place order." };
    }
  },

  getOrders: async () => {
    try {
      const response = await api.get("/orders");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Unable to fetch orders." };
    }
  },

  getOwnerOrders: async () => {
    try {
      const response = await api.get("/owner/orders");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Unable to fetch owner orders." };
    }
  },
};

export const riderApi = {
  getRiderDeliveries: async () => {
    try {
      const response = await api.get("/rider/deliveries");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Unable to fetch rider deliveries." };
    }
  },
};

export const searchApi = {
  search: async (query) => {
    try {
      const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Search failed." };
    }
  },
};

export default api;
