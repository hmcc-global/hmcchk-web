# HMCC HK Web Project Context

## Overview

**HMCC HK Web** is a church website built for Hong Kong Chinese Church (HMCC-HK) with the mission: _"Engage people who were, are, and will be a part of HMCC-HK, in order to Equip them with resources and Enable the church vision to be lived out."_

## Technology Stack

- **Frontend**: React 18.2.0 with Chakra UI, Redux Toolkit, React Router
- **Backend**: Sails.js (Node.js framework) with MongoDB
- **Authentication**: JWT-based with Google OAuth integration
- **Styling**: Chakra UI + SCSS
- **Animation**: Framer Motion, GSAP
- **Deployment**: Separate UI and server builds

## Architecture

- **Monorepo structure**: `/ui` (React frontend) + `/server` (Sails.js backend)
- **API**: RESTful API with Sails.js controllers
- **Database**: MongoDB with Sails ORM
- **State Management**: Redux with persistence
- **Routing**: React Router with private route protection

## Key Features

### Public Features

- **Homepage**: Hero section, events, vision/mission, church themes
- **Sermons**: Online sermons, sermon notes, live streaming
- **Discover**: Church information, visit planning, life groups, connect ministries
- **Building Blocks**: Discipleship program with curriculum and schedule
- **About Us**: Church information and leadership
- **Giving**: Online donation system
- **Events**: Church events and announcements
- **10-Year Anniversary**: Special timeline feature (currently in development)

### User Management

- **User Roles**: `stewardship` > `admin` > `t3ch` > `tc` > `ministry` > `signed` > `unsigned`
- **Authentication**: Email/password + Google OAuth
- **User Profiles**: Complete profile forms, membership tracking
- **Baptism Tracking**: Baptism information and follow-up

### Admin Features

- **User Management**: Admin panel for user data
- **Form Management**: Dynamic form creation and submission handling
- **Content Management**: Announcements, popups, live sermons
- **Data Analytics**: User data queries, form submissions
- **Payment Integration**: Tithely integration for donations

### Technical Features

- **Responsive Design**: Mobile-first with Chakra UI breakpoints
- **Form System**: Dynamic form builder with payment integration
- **Email System**: Template-based email notifications
- **File Management**: Image and document handling
- **Caching**: Redis-based caching system
- **Real-time Updates**: Socket.io for live features

## Current Development

- **Branch**: `1-testing-scroll-effect`
- **Recent Work**: 10-year anniversary timeline feature
- **File Structure**: Well-organized component-based architecture

## Key Files

- **Frontend Entry**: `ui/src/App.js`
- **Main Container**: `ui/src/components/MainContainer.js`
- **Backend Entry**: `server/app.js`
- **User Model**: `server/api/models/User.js`
- **Routes**: `ui/src/components/MainContainer.js` (routing logic)

## Development Workflow

- **Branch Strategy**: `feature` → `release` → `main`
- **Commit Format**: `GH-{issueNumber}: {message}`
- **Review Process**: All PRs require review except hotfixes
- **Build Process**: Separate builds for UI and server

## Database Models

- **User**: Authentication, profile, membership, baptism info
- **Form/Submission**: Dynamic forms and responses
- **Sermon**: Sermon content and notes
- **Announcement**: Church announcements
- **Giving**: Donation tracking
- **Membership**: Member information
- **Baptism**: Baptism records and follow-up
