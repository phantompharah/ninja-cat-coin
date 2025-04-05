# Full-Stack Web Application

A modern full-stack web application using Node.js, Express, React, and Bootstrap.

## Project Structure

```
.
├── backend/           # Node.js + Express backend
│   ├── src/          # Source files
│   ├── config/       # Configuration files
│   └── package.json  # Backend dependencies
│
└── frontend/         # React frontend
    ├── src/          # Source files
    ├── public/       # Static files
    └── package.json  # Frontend dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will run on http://localhost:3000

## Available Scripts

### Backend
- `npm run dev`: Starts the development server with hot-reload
- `npm start`: Starts the production server
- `npm test`: Runs the test suite

### Frontend
- `npm start`: Starts the development server
- `npm build`: Builds the app for production
- `npm test`: Runs the test suite
- `npm run eject`: Ejects from Create React App

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - Express Router
  - CORS
  - Dotenv

- Frontend:
  - React
  - React Router
  - Bootstrap
  - Axios