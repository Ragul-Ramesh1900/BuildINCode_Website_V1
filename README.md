# Dynamic Portfolio Website

A full-stack portfolio website with React frontend, Node.js backend, MongoDB database, and admin panel.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. **Clone and install dependencies**
```bash
npm install
cd server && npm install && cd ..
```

2. **Setup environment variables**
```bash
# Already created: .env and server/.env
# Update MongoDB URI in server/.env if needed
```

3. **Start MongoDB** (if using local)
```bash
mongod
```

4. **Seed the database**
```bash
cd server
npm run seed
cd ..
```

5. **Start both servers**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
npm run dev
```

6. **Access the application**
- Website: http://localhost:5173
- Admin Panel: http://localhost:5173/admin
- API: http://localhost:5000/api

## 📚 Full Documentation

See [SETUP.md](./SETUP.md) for detailed setup instructions, API documentation, and deployment guide.

## ✨ Features

- ✅ Dynamic content management
- ✅ Admin dashboard
- ✅ Contact form with database storage
- ✅ Project portfolio management
- ✅ Service categories
- ✅ Testimonials system
- ✅ Responsive design
- ✅ REST API

## 🛠️ Tech Stack

**Frontend:** React, TypeScript, Vite, TanStack Query, Tailwind CSS, Framer Motion  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**UI Components:** shadcn/ui

## 📝 License

MIT
