# Coimbatore Matrimony - MERN Stack

A modern matrimony platform built with the MERN stack (MongoDB, Express.js, React, Node.js) for connecting eligible bachelors and brides aged 18+.

## Project Structure

```
coimbatore-matrimony/
├── backend/                 # Node.js/Express API server
│   ├── config/             # Database configuration
│   ├── middleware/         # Authentication & upload middleware
│   ├── models/            # MongoDB data models
│   ├── routes/            # API endpoints
│   ├── uploads/           # File upload directory
│   ├── .env.example       # Environment variables template
│   ├── package.json       # Backend dependencies
│   ├── server.js          # Main server file
│   └── README.md          # Backend documentation
├── frontend/               # React/Vite frontend application
│   ├── public/            # Static assets
│   ├── src/               # React source code
│   ├── .env               # Frontend environment variables
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.ts     # Vite configuration
│   └── README.md          # Frontend documentation
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Features

- **Admin Dashboard**: Manage profiles with full CRUD operations
- **Profile Management**: Create and view detailed profiles
- **Image Upload**: Support for multiple profile images
- **Responsive Design**: Mobile-first approach with modern UI
- **Security**: JWT authentication, CORS, rate limiting
- **Modern Stack**: React 18, TypeScript, Tailwind CSS, Express.js

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation & Setup

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/coimbatore-matrimony
JWT_SECRET=your-secure-jwt-secret
ADMIN_EMAIL=admin@coimbatorematrimony.in
ADMIN_PASSWORD=your-secure-password
```

### Frontend (.env)
```env
# VITE_API_BASE_URL=https://your-production-api-url
# Leave commented for localhost development
```

## Development

### Running Both Services

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

### Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Login**: http://localhost:5173/admin/login

## Production Deployment

### Backend Deployment
1. Set up MongoDB Atlas database
2. Configure environment variables on your hosting platform
3. Deploy backend to Render, Heroku, or VPS

### Frontend Deployment
1. Build the frontend: `cd frontend && npm run build`
2. Deploy `frontend/dist` folder to Netlify, Vercel, or Apache server
3. Update `VITE_API_BASE_URL` in `.env` for production API URL

## API Endpoints

### Authentication
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/verify` - Verify admin token

### Profiles
- `GET /api/profiles` - Get all profiles
- `GET /api/profiles/:id` - Get single profile
- `POST /api/profiles` - Create profile (Admin)
- `PUT /api/profiles/:id` - Update profile (Admin)
- `DELETE /api/profiles/:id` - Delete profile (Admin)

## Technologies Used

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (routing)
- Lucide React (icons)
- Framer Motion (animations)

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- CORS, Helmet for security

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
