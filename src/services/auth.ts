const TOKEN_KEY = 'blog_admin_token';
const USER_KEY = 'blog_admin_user';

export const authService = {
  login: (token: string, user?: any) => {
    localStorage.setItem(TOKEN_KEY, token);
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  getUser: () => {
    try {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
  getAuthHeaders: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};
