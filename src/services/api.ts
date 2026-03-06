const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Hero
  getHero: async () => {
    const res = await fetch(`${API_BASE_URL}/hero`);
    return res.json();
  },
  updateHero: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/hero`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Projects
  getProjects: async () => {
    const res = await fetch(`${API_BASE_URL}/projects`);
    return res.json();
  },
  createProject: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateProject: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteProject: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  // Services
  getServices: async () => {
    const res = await fetch(`${API_BASE_URL}/services`);
    return res.json();
  },
  createService: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Testimonials
  getTestimonials: async () => {
    const res = await fetch(`${API_BASE_URL}/testimonials`);
    return res.json();
  },
  createTestimonial: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Contact
  submitContact: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  getContacts: async () => {
    const res = await fetch(`${API_BASE_URL}/contact`);
    return res.json();
  },
  // Blogs
  getBlogs: async (params?: any) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await fetch(`${API_BASE_URL}/blogs${query}`);
    return res.json();
  },
  getBlog: async (slug: string) => {
    const res = await fetch(`${API_BASE_URL}/blogs/${slug}`);
    return res.json();
  },
  createBlog: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateBlog: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteBlog: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  // Categories & Tags
  getCategories: async () => {
    const res = await fetch(`${API_BASE_URL}/categories`);
    return res.json();
  },
  createCategory: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteCategory: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
  getTags: async () => {
    const res = await fetch(`${API_BASE_URL}/tags`);
    return res.json();
  },
  createTag: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/tags`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteTag: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/tags/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  // Blog Settings
  getBlogSettings: async () => {
    const res = await fetch(`${API_BASE_URL}/blog/settings`);
    return res.json();
  },
  updateBlogSettings: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/blog/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Stats
  getBlogStats: async () => {
    const res = await fetch(`${API_BASE_URL}/blogs/stats`);
    return res.json();
  },
};
