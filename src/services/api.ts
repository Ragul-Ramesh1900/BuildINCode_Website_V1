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
};
