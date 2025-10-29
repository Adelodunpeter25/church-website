# Church Management Website

A modern, full-featured church administration platform built with React, TypeScript, and Vite.

## Features

- **Public Landing Page** - Marketing website with services, events, and contact information
- **Admin Dashboard** - Central hub with statistics and quick access to features
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
react-app/
├── src/
│   ├── pages/              # Page components
│   │   ├── announcements/  # Announcements components
│   │   ├── events/         # Events components
│   │   ├── forms/          # Forms components
│   │   ├── live/           # Live streaming components
│   │   ├── membership/     # Membership components
│   │   ├── playlists/      # Playlists components
│   │   ├── profile/        # Profile components
│   │   ├── sermons/        # Sermons components
│   │   ├── settings/       # Settings components
│   │   ├── Dashboard.tsx
│   │   └── LandingPage.tsx
│   ├── components/         # Shared components
│   ├── App.tsx            # Main app with routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html            # HTML template
└── package.json
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
