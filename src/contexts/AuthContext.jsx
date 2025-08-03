import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      
      setUser({
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
      });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username, password) => {
    try {
  
      if (username === 'admin' && password === 'admin') {
        const mockUser = {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        navigate('/dashboard');
        return { success: true };
      } else {
        return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getUserInfo = async () => {
    try {
     
      const mockUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
      };
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    getUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
