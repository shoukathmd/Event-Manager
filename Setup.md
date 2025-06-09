# Setup Instructions

This document provides step-by-step instructions to get the Mini Event Manager running locally.

## Prerequisites

* **Node.js** v16 or higher
* **npm** v8 or higher (or **yarn**)
* **Git** (for cloning the repo)

## 1. Clone the Repository

```bash
git clone https://github.com/shoukathmd/Event-Manager.git event-manager
cd event-manager
```

## 2. Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

## 3. Configure Environment (Optional)

* No extra environment variables are required for the mock in-memory GraphQL server.
* If you wish to change ports, update `src/index.ts` (backend) or `next.config.js` (frontend).

## 4. Start the Services

### Backend (GraphQL Server)

In one terminal:

```bash
cd backend
npm run dev
```

This starts Apollo Server on [**http://localhost:4000**](http://localhost:4000).

### Frontend (Next.js App)

In a separate terminal:

```bash
cd frontend
npm run dev
```

This starts Next.js on [**http://localhost:3000**](http://localhost:3000) (Turbopack or Webpack).

## 5. Verify Installation

1. Open [**http://localhost:3000**](http://localhost:3000) in your browser.
2. Navigate to **Events** to see the list (initially empty).
3. Click **New Event** to create an event and verify it appears in the list.
4. Click an event to manage attendees (add/remove).



## 6. Directory Structure

```
event-manager/
├─ backend/                    # GraphQL server (Apollo, TypeScript)
│  ├─ src/
│  │  ├─ events/               # Domain-specific folder for event-related modules
│  │  │   ├─ data.ts
│  │  │   ├─ schema.ts
│  │  │   └─ resolvers.ts
│  │  └─ index.ts              # Entry point wiring up ApolloServer
│  ├─ package.json
│  ├─ package-lock.json
│  └─ tsconfig.json

├─ frontend/                   # Next.js app (App Router, React, TypeScript)
│  ├─ lib/                     # Shared utilities (e.g., apolloClient.ts)
│  │   └─ apolloClient.ts
│  ├─ src/
│  │   ├─ app/                 # Next.js App Router pages
│  │   │   ├─ events/          # /events, /events/new, /events/[id]
│  │   └─ graphql/             # GraphQL operations (queries & mutations)
│  ├─ public/                  # Static assets
│  ├─ .next/                   # Next.js build output
│  ├─ next.config.js
│  ├─ package.json
│  └─ tsconfig.json

├─ ENTITIES.md                 # Data model design
├─ SETUP.md                    # Setup instructions
└─ NOTES.md                    # Assumptions & known issues
```

---


