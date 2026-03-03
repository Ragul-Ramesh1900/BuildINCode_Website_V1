# Dynamic Portfolio Website Setup Guide

Your static website has been transformed into a fully dynamic system with a backend API, database, and admin panel.

## Architecture

- **Frontend**: React + TypeScript + Vite + TanStack Query
- **Backend**: Node.js + Express + MongoDB
- **Admin Panel**: Built-in dashboard at `/admin`

## Setup Instructions

### 1. Install MongoDB

**Option A: Local Installation**
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB: `mongod`

**Option B: MongoDB Atlas (Cloud)**
- Create free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Get connection string and update `.env`

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

Seed the database:
```bash
npm run seed
```

Start the backend:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# In the root directory
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

Install dependencies (if needed):
```bash
npm install
```

Start the frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Features

### Dynamic Content Management

All content is now fetched from the database:
- ✅ Hero section (title, description, stats)
- ✅ Projects portfolio
- ✅ Services categories
- ✅ Testimonials
- ✅ Contact form submissions

### Admin Dashboard

Access at `http://localhost:5173/admin`

Features:
- Add/edit/delete projects
- View contact form submissions
- Manage hero section content
- View testimonials

### API Endpoints

**Hero**
- `GET /api/hero` - Get hero content
- `PUT /api/hero` - Update hero content

**Projects**
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

**Services**
- `GET /api/services` - List all services
- `POST /api/services` - Create service category

**Testimonials**
- `GET /api/testimonials` - List testimonials
- `POST /api/testimonials` - Create testimonial

**Contact**
- `GET /api/contact` - List submissions (admin)
- `POST /api/contact` - Submit contact form

## Development Workflow

1. Start MongoDB
2. Start backend: `cd server && npm run dev`
3. Start frontend: `npm run dev`
4. Access website: `http://localhost:5173`
5. Access admin: `http://localhost:5173/admin`

## Production Deployment

### Backend
- Deploy to services like Railway, Render, or Heroku
- Set environment variables
- Use MongoDB Atlas for database

### Frontend
- Build: `npm run build`
- Deploy to Vercel, Netlify, or similar
- Update `VITE_API_URL` to production backend URL

## Next Steps

Consider adding:
- Authentication for admin panel
- Image upload functionality
- Blog system
- Analytics dashboard
- Email notifications for contact forms
- SEO metadata management

## Troubleshooting

**MongoDB connection error**
- Ensure MongoDB is running
- Check connection string in `.env`

**CORS errors**
- Verify `VITE_API_URL` in frontend `.env`
- Check backend CORS configuration

**Data not loading**
- Run seed script: `cd server && npm run seed`
- Check browser console for errors
- Verify backend is running
