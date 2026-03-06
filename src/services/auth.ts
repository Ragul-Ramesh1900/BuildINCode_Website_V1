export const authService = {
  login: (token: string) => {
    localStorage.setItem("blog_admin_token", token);
  },
  logout: () => {
    localStorage.removeItem("blog_admin_token");
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("blog_admin_token");
  },
  getToken: () => {
    return localStorage.getItem("blog_admin_token");
  }
};
