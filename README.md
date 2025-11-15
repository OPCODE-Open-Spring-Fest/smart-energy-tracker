# Smart Energy Tracker

We welcome contributions to Smart Energy Tracker, a real-time energy monitoring and inverter control system. Whether you want to add features, fix bugs, improve performance, or enhance the user experience, your contribution is valuable!

---

## Features

- Real-time inverter status updates
- Battery level monitoring with low-battery warnings
- Energy consumption tracking
- Temperature and humidity monitoring with high-temperature warnings
- Manual and automatic control of inverter
- Event timeline and notifications
- Interactive charts and dashboards
- Mock WebSocket server for testing

---

## Tech Stack

- Frontend: React.js, Vite, CSS
- Backend (mock server): Node.js, Express.js, Socket.IO
- State management: React Context
- Charts & visualization: Custom components

---

## Prerequisites

- Node.js v18+ (recommended)
- npm v9+ (comes with Node.js)
- Git

---

## Installation
1. **Clone the repository**

git clone <repo>
cd smart-energy-tracker

Project structure
```

invertorguard/
│
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── .gitignore
├── public/
│   └── favicon.ico
│
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Logs.jsx
│   │   └── Settings.jsx
│   ├── components/
│   │   ├── StatusCard.jsx
│   │   ├── EventTimeline.jsx
│   │   ├── ScheduleManager.jsx
│   │   ├── EnergyCharts.jsx
│   │   ├── ManualSwitch.jsx
│   │   └── NotificationList.jsx
│   ├── context/
│   │   ├── SocketContext.jsx
│   │   ├── NotificationContext.jsx
│   │   └── AppContext.jsx
│   ├── utils/
│   │   ├── mockSocketServer.js      # optional dev helper
│   │   └── format.js
│   └── assets/
│       └── images/
│
└── server/
    └── mock-socket-server.js         # Node + socket.io demo server (dev)

```


# Run frontend
```
npm run dev
```

# Run backend
```
npm start
```

1. Adding Features or Components

What to contribute

- New React components (dashboard widgets, status cards).
- Utilities and helper functions.
- Backend/mock-server features or API endpoints.
- Examples
- Real-time charts for energy consumption, battery levels, inverter status.
- Custom notifications for low battery, power cuts, critical events.
- Dashboard widgets for historical trends and analysis.



Where to place code

- Frontend components → src/components/
- Utilities → src/utils/
- Backend/mock logic → server/



Best practices

* Write clean, maintainable code with comments.
* Follow existing folder structure and naming conventions.

2. Bug Fixes

- Common issues
- WebSocket connection errors or dropped messages.
- Incorrect mock-data simulation or real-time update problems.
- UI misalignment or broken responsive behavior.
- Memory leaks (e.g., intervals not cleared).



Steps

- Locate files (src/ for frontend, server/ for backend).
- Create a bug branch, fix, and test locally.
- Commit with a descriptive message and open a PR referencing the issue.



3. Performance Optimization

- Goals
- Improve responsiveness, reduce CPU/load, minimize UI lag.
- Ideas
- Optimize WebSocket emission frequency and update logic.
- Debounce/throttle frequent UI updates.
- Lazy-load heavy components or charts.
- Compress and optimize assets (images/icons).



4. (previously 5) Testing & Quality Assurance



What to add

- Unit tests for React components (Jest + React Testing Library).
- Integration tests for WebSocket flows (mock server).
Steps

- Add tests under src/__tests__/ or server/__tests__/.
- Run tests locally and ensure they pass on multiple devices/browsers.

5. (previously 6) UI / UX Improvements
   

Focus areas

- Mobile responsiveness and layout polishing.
- Color schemes for warnings (low battery, high temp, power cut).
- Smooth animations for updates and transitions.
- Accessibility: ARIA labels, keyboard nav, color contrast.


Steps

- Update styles in src/index.css or component-level CSS.
- Test across devices/resolutions.



6. (previously 8) Real-Time Data & Mock Server

Enhancements

- Add mock sensors: voltage, current, power factor.
- Simulate seasonal or daily usage patterns.
- Better random event simulation (power cuts, manual overrides).
- Ensure mock payloads match frontend expectations.



Files

- Server mock code → server/mock-socket-server.js
- Optional dev helpers → src/utils/mockSocketServer.js



7. Challenges & Opportunities (short)


- WebSocket stability — improve reconnect & retry logic.
- Alerts accuracy — handle edge cases (e.g., power-cut + low battery).
- Dashboard performance — reduce chart lag with high-frequency updates.
- Responsive UI — perfect mobile behavior on smaller screens.
- Test coverage — add unit/integration tests.
- Code cleanup — remove redundant code in mock server/utilities.
- Security — validate & sanitize incoming socket data.
- Feature expansion — scheduling, historical charts, user preferences.



8. Content Guidelines & Quality Standards

   

What to include

- Functional, well-tested code.
- Clear commit messages and documentation.
- Well-structured components and utilities.
- Respectful and constructive contributions.
  
Quality checks
- Verify real-time updates & notifications behave correctly.
- Test changes on multiple devices before PR.
- Keep consistent styling, naming, and folder structure.
- Avoid adding unnecessary dependencies.
- Quick Setup & Run (point-wise commands)


## Environment Setup (.env configuration)

Before running the project, create an environment file.

1. Create a `.env` file in the root directory.
2. Copy the content from `.env.example` and paste it into the `.env` file.

```bash
cp .env.example .env
```

## Demo Login Credentials

Use the following demo account to log in:

- **Email:** `a@gmail.com`
- **Password:** `123`

