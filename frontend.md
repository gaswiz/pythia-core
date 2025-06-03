# Frontend V2 (React + Vite)

This document provides a full overview of the `frontend-v2` folder of the P.Y.T.H.I.A. project. This version replaces the earlier `frontend/` implementation and is built using **React** with **Vite** as the bundler and development server. It is intended to be clean, modular, and easy to integrate with the backend system.

---

## Overview

The frontend is a modern React application structured to interact with the P.Y.T.H.I.A. backend, which provides predictions for campaign performance using machine learning. It fetches results from the backend and visualizes them in a user-friendly interface.

This implementation leverages Vite for fast refresh, lightweight dev server startup, and optimized builds.

---

## File and Folder Structure

```
frontend-v2/
├── public/                     # Static files served as-is
│   └── favicon.ico            # App favicon
├── src/                       # Source files
│   ├── assets/                # Local images and static media
│   │   └── logo.png          # Example image asset
│   ├── components/            # Reusable React components
│   │   ├── Dashboard.jsx     # Main dashboard UI component
│   │   └── Header.jsx        # Header bar with branding or nav
│   ├── App.jsx                # Root React component
│   ├── main.jsx               # Application entry point for Vite
│   └── styles.css             # Global styles (if any)
├── index.html                 # Root HTML file loaded by Vite
├── package.json               # Project metadata and scripts
├── vite.config.js             # Vite configuration
└── README.md                  # (To be replaced by this document)
```

---

## Application Flow and Functionality

1. **Entry Point:**

   * The app starts at `main.jsx`, which mounts the `App` component into the DOM.

2. **App Component:**

   * `App.jsx` acts as the layout controller and router for the application.
   * Components like `Dashboard` or `Header` are rendered here or conditionally based on application logic.

3. **Dashboard:**

   * This is the main view presented to users.
   * It likely fetches prediction results from the backend (e.g., `/predict`) and renders charts, metrics, or KPIs.
   * Any frontend logic for parsing or displaying model output is located here.

4. **Header:**

   * A simple reusable UI element for branding or navigation.

5. **Assets:**

   * The `assets/` folder includes images or other static resources referenced in JSX.

6. **Styling:**

   * Styles are written in `styles.css` or directly in JSX using class names. You can use a CSS framework if needed.

7. **API Calls:**

   * Likely made using `fetch` or `axios` from within components (e.g., `Dashboard.jsx`) to retrieve campaign prediction data from the Flask backend.

---

## How to Run the Frontend (Development Mode)

### Prerequisites

* Node.js (v18.x or later recommended)
* npm (v9.x or later)

### Step-by-Step Setup

1. **Navigate to the project directory:**

   ```bash
   cd frontend-v2
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**

   * Vite will provide a local server (usually `http://localhost:5173`)

---

## Building for Production

To build an optimized version of the frontend:

```bash
npm run build
```

This will output the static files to the `dist/` directory, which can then be served by any static file server or connected to the backend.

---

## Troubleshooting / FAQ

### Q: `npm: command not found`

**A:** Ensure Node.js and npm are installed. Visit [https://nodejs.org/](https://nodejs.org/) and install the latest LTS version.

### Q: `npm install` fails or hangs

**A:** Delete `node_modules/` and `package-lock.json`, then try again:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Q: `npm run dev` says script is missing

**A:** Make sure you're in the correct folder (`frontend-v2`). The correct script should exist in `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### Q: Frontend loads but no data appears

**A:** Make sure the backend is running and accessible from the frontend. Check that CORS is enabled on the backend and that it's running on the expected port (`http://localhost:5000` by default).

### Q: Styling looks broken

**A:** Check that `styles.css` is correctly imported in `main.jsx` or `App.jsx` and that no CSS files are missing or misnamed.

### Q: Can't preview build

**A:** Run:

```bash
npm run build
npm run preview
```

Vite will serve the production build on a new local port.

---

## Final Notes

This frontend is designed to be simple, extendable, and focused entirely on visualizing campaign prediction data. All interaction with the backend happens through HTTP requests defined in the main components. Contributions or improvements should follow React best practices and maintain Vite-compatible configurations.
