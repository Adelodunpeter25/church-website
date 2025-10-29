# Church Management Website

A modern, full-featured church administration platform built with React, TypeScript, and Vite.

## Features

- **Public Landing Page** - Marketing website with services, events, and contact information
- **Admin Dashboard** - Central hub with statistics and quick access to features
- **Member Dashboard** - Personal portal for church members
- **Membership Management** - Member directory with search, filtering, and attendance tracking
- **Sermon Library** - Upload, organize, and manage sermons with audio playback
- **Event Management** - Calendar and list views for church events
- **Live Streaming** - Audio streaming with viewer tracking
- **Announcements** - Share updates with congregation
- **Forms Management** - Create registration and survey forms
- **Playlists** - Organize favorite sermons
- **Settings** - Comprehensive system configuration

## Tech Stack

- **Framework:** React 18 + Vite 5
- **Language:** TypeScript 5
- **Routing:** React Router 6
- **Styling:** Tailwind CSS 3.4
- **Icons:** RemixIcon
- **Charts:** Recharts
- **Maps:** Google Maps API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd church-website/frontend
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
church-website/
├── frontend/
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── announcements/  # Announcements page & components
│   │   │   ├── dashboard/      # Admin dashboard
│   │   │   ├── events/         # Events page & components
│   │   │   ├── forms/          # Forms page & components
│   │   │   ├── landing/        # Public landing page
│   │   │   ├── live/           # Live streaming page & components
│   │   │   ├── member-dashboard/ # Member portal
│   │   │   ├── membership/     # Membership page & components
│   │   │   ├── playlists/      # Playlists page & components
│   │   │   ├── profile/        # Profile page & components
│   │   │   ├── sermons/        # Sermons page & components
│   │   │   └── settings/       # Settings page & components
│   │   ├── components/         # Shared components
│   │   ├── App.tsx            # Main app with routing
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Static assets
│   ├── index.html            # HTML template
│   └── package.json
└── README.md
```

## Current Status

This is a **frontend prototype** with mock data. To make it production-ready:

### Required
- Backend API integration
- Database (PostgreSQL/MongoDB)
- Authentication system
- State management (Zustand/Context API)
- Form validation (Zod/Yup)

### Recommended
- Unit/integration tests
- Real-time features (WebSockets)
- Email service integration
- Image optimization
- Analytics integration

## License

MIT
