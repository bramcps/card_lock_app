"use Client";
import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // if (error.response?.status === 401 && !originalRequest._retry) {
        //   originalRequest._retry = true;

        //   try {
        //     const response = await refreshToken();
        //     if (response?.token) {
        //       localStorage.setItem('token', response.token);
        //       api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

        //       return api(originalRequest);
        //     }
        //   } catch (refreshError) {
        //     signOut();
        //     return Promise.reject(refreshError);
        //   }
        // }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await getUser();
          setUser(userData);
        } catch (err) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/signin', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setUser(user);
      return { success: true, user };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/users', userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setUser(user);
      return { success: true, user };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await api.post('/signout');
      }
    } catch (err) {
      console.error('Error during sign out:', err);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
      router.push('/login');
    }
  };

  const getUser = async () => {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to get user data');
    }
  };

  const refreshToken = async () => {
    try {
      const response = await api.post('/refresh');
      return response.data;
    } catch (err) {
      throw new Error('Failed to refresh token');
    }
  };

  const updateUser = async (id, userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/users/${id}`, userData);
      if (user && user.id === id) {
        setUser(response.data.user);
      }

      return { success: true, user: response.data.user };
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/users/${id}`);
      return { success: true, user: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const listUsers = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/users?page=${page}`);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/users/${id}`);
      return { success: true, message: response.data.message };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const activateUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/users/${id}/activate`);
      return { success: true, message: response.data.message };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to activate user');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const deactivateUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/users/${id}/deactivate`);
      return { success: true, message: response.data.message };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to deactivate user');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
    register,
    getUser,
    updateUser,
    getUserById,
    listUsers,
    deleteUser,
    activateUser,
    deactivateUser,
    isAuthenticated,
    isAdmin,
  };
}
