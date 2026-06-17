# Sada Al-Tamr

Sada Al-Tamr is an intelligent system designed to transform Arabic date auction audio into structured data and real-time analytics.

The system helps document auction activities, extract key information from spoken auction calls, and provide insights that support better market understanding and decision-making.

---

## Project Idea

In traditional date auctions, valuable information is exchanged verbally, such as price, quantity, date type, seller, buyer, and auction trends.

Sada Al-Tamr aims to capture auction audio, convert it into text, extract meaningful data, and present it through a simple and useful dashboard.

---

## Project Goals

- Convert auction audio into text.
- Extract important auction data from Arabic speech.
- Store auction records in a structured database.
- Provide real-time analytics and market insights.
- Support offline recording when the internet connection is unavailable.
- Synchronize offline data once the connection is restored.

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- FastAPI
- WebSocket

### Database
- SQLite for local/offline usage
- PostgreSQL for production usage

### Artificial Intelligence
- Whisper for speech-to-text
- Allam API for Arabic language understanding and data extraction
- XGBoost for analytics and predictions

### Other Tools
- Docker
- GitHub
- Offline Sync

---

## Project Structure

```text
sada-altamr/
│
├── backend/
│   └── app/
│       ├── api/
│       ├── core/
│       ├── models/
│       ├── services/
│       └── db/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── assets/
│
├── ai-models/
│   ├── whisper/
│   ├── allam/
│   ├── xgboost/
│   └── datasets/
│
├── offline-sync/
├── docs/
├── scripts/
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## GitHub Branches

- `main`  
  Stable and final version of the project.

- `dev`  
  Development branch used to collect and test the team's work.

- `feat/ai`  
  Branch for AI tasks, speech-to-text, and Arabic data extraction.

- `feat/backend`  
  Branch for backend APIs, database, and server logic.

- `feat/frontend`  
  Branch for user interface and dashboard development.

- `feat/offline-sync`  
  Branch for offline mode and data synchronization.

---

## Team Roles

- Member 1: Tech Lead  
  Responsible for GitHub setup, project structure, branches, Docker, and environment files.

- Member 2: AI Engineer  
  Responsible for Whisper, Allam API, and auction data extraction.

- Member 3: Backend Developer  
  Responsible for FastAPI, database design, and APIs.

- Member 4: Frontend Developer  
  Responsible for the user interface and dashboard.

- Member 5: QA / Data / Offline Sync  
  Responsible for testing, preparing data, and supporting offline mode.

---

## Local Setup

First, copy the environment example file:

```bash
cp .env.example .env
```

Then run the project using Docker:

```bash
docker compose up --build
```

Backend URL:

```text
http://localhost:8000
```

Frontend URL:

```text
http://localhost:5173
```

---

## Important Notes

- Do not upload the `.env` file to GitHub.
- Only upload `.env.example`.
- Do not write API keys directly inside the code.
- Do not push directly to the `main` branch.
- Each team member should work on their assigned branch.
- Work should be merged into `dev` first, then tested before merging into `main`.

---

## Project Status

This project is currently being developed as a hackathon prototype for Agent X under the Smart Agriculture track.
