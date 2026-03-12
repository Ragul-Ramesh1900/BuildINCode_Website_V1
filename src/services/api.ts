import { authService } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  ...authService.getAuthHeaders(),
});

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }
  return res.json();
};

export const api = {
  // Hero
  getHero: async () => {
    const res = await fetch(`${API_BASE_URL}/hero`);
    return handleResponse(res);
  },
  updateHero: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/hero`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Projects
  getProjects: async () => {
    const res = await fetch(`${API_BASE_URL}/projects`);
    return handleResponse(res);
  },
  createProject: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  updateProject: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  deleteProject: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  // Services
  getServices: async () => {
    const res = await fetch(`${API_BASE_URL}/services`);
    return handleResponse(res);
  },
  createService: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Testimonials
  getTestimonials: async () => {
    const res = await fetch(`${API_BASE_URL}/testimonials`);
    return handleResponse(res);
  },
  createTestimonial: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Contact
  submitContact: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  getContacts: async () => {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  // Blogs (public - no auth headers)
  getBlogs: async (params?: any) => {
    const cleanParams = params ? Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    ) : {};
    const query = Object.keys(cleanParams).length ? '?' + new URLSearchParams(cleanParams as any).toString() : '';
    // Add auth headers if logged in (admin gets all posts)
    const headers: any = {};
    const token = authService.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE_URL}/blogs${query}`, { headers });
    return handleResponse(res);
  },
  getBlog: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },
  getBlogBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`);
    return handleResponse(res);
  },
  createBlog: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  updateBlog: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  deleteBlog: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  // Image Upload (Cloudinary)
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    // Do NOT set Content-Type here — browser sets it automatically with boundary
    const token = authService.getToken();
    const res = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    return handleResponse(res);
  },
  deleteImage: async (publicId: string) => {
    const res = await fetch(`${API_BASE_URL}/upload/image/${encodeURIComponent(publicId)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  // Categories & Tags (public read, protected write)
  getCategories: async () => {
    const res = await fetch(`${API_BASE_URL}/categories`);
    return handleResponse(res);
  },
  createCategory: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  updateCategory: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  deleteCategory: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return handleResponse(res);
  },
  getTags: async () => {
    const res = await fetch(`${API_BASE_URL}/tags`);
    return handleResponse(res);
  },
  createTag: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/tags`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  deleteTag: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/tags/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  // Blog Settings
  getBlogSettings: async () => {
    const res = await fetch(`${API_BASE_URL}/blog/settings`);
    return handleResponse(res);
  },
  updateBlogSettings: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/blog/settings`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Auth
  login: async (credentials: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },
  logout: async () => {
    authService.logout();
    return { success: true };
  },
  getMe: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },
  changePassword: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Stats
  getBlogStats: async () => {
    const res = await fetch(`${API_BASE_URL}/blogs/stats`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },
};
