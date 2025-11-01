# Bibleway Fellowship Tabernacle - Church Management Website

A modern, full-featured church administration platform built with React, TypeScript, Vite, Node.js, Express, and PostgreSQL.

## Tech Stack

### Frontend
- **Framework:** React 18 + Vite 5
- **Language:** TypeScript 5
- **Routing:** React Router 6
- **Styling:** Tailwind CSS 3.4
- **Icons:** RemixIcon
- **Charts:** Recharts
- **Real-time:** Websockets

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT + bcrypt
- **File Upload:** Multer
- **Email:** Resend API
- **Real-time:** WebSocket (ws)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Backend Setup

1. Navigate to backend directory
```bash
cd church-website/backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials and settings
```

4. Run database migrations
```bash
npm run migrate
```

5. Start backend server
```bash
npm run dev
```

Backend runs on [http://localhost:5001](http://localhost:5001)

### Frontend Setup

1. Navigate to frontend directory
```bash
cd church-website/frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
# Create .env file with:
VITE_API_URL=http://localhost:5001/api
VITE_WS_URL=ws://localhost:5001
```

4. Run development server
```bash
npm run dev
```

Frontend runs on [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

## Project Structure

```
church-website/
├── backend/
│   ├── migrations/             # Database migration files
│   ├── src/
│   │   ├── config/            # Database and socket configuration
│   │   ├── controllers/       # Business logic
│   │   ├── middleware/        # Authentication middleware
│   │   ├── routes/            # API routes
│   │   ├── services/          # Email, storage, notifications
│   │   ├── websocket/         # WebSocket handlers
│   │   └── server.js          # Entry point
│   ├── uploads/               # File storage
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── public/        # Public pages (landing, about, contact)
│   │   │   ├── auth/          # Authentication pages
│   │   │   ├── dashboard/     # Admin dashboard
│   │   │   ├── member-dashboard/ # Member portal
│   │   │   └── ...            # Other feature pages
│   │   ├── components/
│   │   │   └── layout/        # PublicNavbar, PublicFooter, etc.
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API client
│   │   ├── types/             # TypeScript types
│   │   ├── context/           # AuthContext
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Key Features Implemented

### Authentication & Security
- JWT-based authentication with token blacklist
- Role-based access control (admin, pastor, minister, staff, member)
- Login attempt tracking and account lockout
- Audit logging for security events
- Password hashing with bcrypt

### Real-time Features
- Live streaming with WebSocket
- Real-time chat during streams
- Live viewer tracking
- Notification delivery

### Database
- PostgreSQL with proper indexing
- Relational data structure

## Production Deployment

### Environment Variables to Configure
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Strong secret key for JWT
- `RESEND_API_KEY` - Email service API key
- `FRONTEND_URL` - Production frontend URL

## License

MIT
