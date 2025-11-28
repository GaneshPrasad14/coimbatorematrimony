# Coimbatore Matrimony Backend API

A Node.js/Express backend API for the Coimbatore Matrimony admin panel with MongoDB integration.

## Features

- **Admin Authentication**: JWT-based admin login system
- **Profile Management**: Full CRUD operations for groom/bride profiles
- **Image Upload**: Support for multiple image uploads (local storage or AWS S3)
- **Security**: Helmet, CORS, rate limiting, input validation
- **MongoDB Integration**: Mongoose ODM for data modeling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer (with AWS S3 support)
- **Security**: Helmet, CORS, Express Rate Limit
- **Validation**: Express Validator

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   └── upload.js           # Multer file upload configuration
├── models/
│   └── Profile.js          # Profile data model
├── routes/
│   ├── auth.js             # Authentication routes
│   └── profiles.js         # Profile CRUD routes
├── uploads/                # Local file storage (if not using S3)
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
├── server.js               # Main application entry point
└── README.md               # This file
```

## Installation

1. **Clone the repository and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration values.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/coimbatore-matrimony

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin Credentials
ADMIN_EMAIL=admin@coimbatoremartimony.com
ADMIN_PASSWORD=admin123

# AWS S3 Configuration (Optional - for production)
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=coimbatore-matrimony
```

## API Endpoints

### Authentication
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/verify` - Verify admin token

### Profiles
- `GET /api/profiles` - Get all profiles (Admin only)
- `GET /api/profiles/:id` - Get single profile (Admin only)
- `POST /api/profiles` - Create new profile (Admin only)
- `PUT /api/profiles/:id` - Update profile (Admin only)
- `DELETE /api/profiles/:id` - Delete profile (Admin only)
- `GET /api/profiles/stats/summary` - Get profile statistics (Admin only)

### Health Check
- `GET /api/health` - API health check

## Usage

### Admin Login
```javascript
const response = await fetch('/api/auth/admin/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@coimbatoremartimony.com',
    password: 'admin123'
  }),
});

const data = await response.json();
// Store token: localStorage.setItem('adminToken', data.token);
```

### Create Profile with Images
```javascript
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('age', '30');
formData.append('gender', 'male');
// ... other fields
formData.append('images', imageFile1);
formData.append('images', imageFile2);

const response = await fetch('/api/profiles', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
  },
  body: formData
});
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse with request limits
- **Input Validation**: Comprehensive validation using express-validator
- **CORS**: Configured for frontend integration
- **Helmet**: Security headers
- **File Upload Security**: File type and size restrictions

## File Upload

The API supports both local storage and AWS S3 for image uploads:

- **Local Storage**: Images stored in `backend/uploads/` directory
- **AWS S3**: Images uploaded to configured S3 bucket (recommended for production)

Configure AWS credentials in `.env` to enable S3 uploads.

## Development

- **Development Server**: `npm run dev` (with nodemon)
- **Production Server**: `npm start`
- **Health Check**: Visit `http://localhost:5000/api/health`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
