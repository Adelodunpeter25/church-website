# Church Management Website

A modern, full-featured church administration platform built with Next.js, React, and TypeScript.

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

- **Framework:** Next.js 15.3.2
- **UI Library:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4.17
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
cd church-website
```

2. Install dependencies
```bash
cd frontend
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory.

## Project Structure

```
church-website/
├── frontend/
│   ├── app/                    # Next.js app directory
│   │   ├── announcements/      # Announcements feature
│   │   ├── dashboard/          # Admin dashboard
│   │   ├── events/             # Event management
│   │   ├── forms/              # Forms management
│   │   ├── landing/            # Public landing page
│   │   ├── live/               # Live streaming
│   │   ├── membership/         # Member management
│   │   ├── playlists/          # Sermon playlists
│   │   ├── profile/            # User profile
│   │   ├── sermons/            # Sermon library
│   │   ├── settings/           # System settings
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home redirect
│   ├── components/             # Shared components
│   ├── public/                 # Static assets
│   └── package.json
└── README.md
```

## Current Status

This is a **frontend prototype** with mock data. To make it production-ready:

### Required
- Backend API integration
- Database (PostgreSQL/MongoDB)
- Authentication system (NextAuth.js)
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
