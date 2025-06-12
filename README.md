# TalentScout

This repository mirrors the basic structure of **TalentSite**. The monorepo contains three packages:

- **client/** – static HTML forms for manual testing
- **server/** – Express API backed by MongoDB
- **web/** – Next.js application

## Getting Started

### Setup

```bash
cp server/.env.example server/.env
cp web/.env.example web/.env
npm install --workspaces
```

Set a value for `JWT_SECRET` in each `.env` file. The applications will throw
an error if this variable is missing.

### Running Locally

```bash
npm run dev
```

The API runs on `http://localhost:3001` and the Next.js app on `http://localhost:3000`.

To try the dashboards without a backend, use the `frontend` package which ships with mock data:

```bash
cd frontend
cp .env.local.example .env.local
npm run demo
```

### Running Tests

```bash
npm test
```

This executes the baseline script which runs unit tests for each package and writes `BASELINE_REPORT.md`.

### MongoDB Binary for Offline Tests

```bash
npx mongodb-memory-server download --downloadDir ./mongodb-binaries --version 6.0.5
DOWNLOAD_DIR=./mongodb-binaries npm test
```

### Docker Compose

A simple `docker-compose.yml` is provided to start MongoDB, the server and the web app together.

## Deployment

Deploy the Next.js app with Vercel or any Node hosting. Deploy the Express server to a service like Heroku or Render. Remember to set the environment variables shown in the `.env.example` files.

## Production Setup

Before building for production, copy the example environment files and add your
production secrets:

```bash
cp server/.env.example server/.env
cp web/.env.example web/.env
# edit these files with real values
```

Run the full test suite and ensure it passes:

```bash
npm test
```

Once tests succeed, build the project:

```bash
npm run build
```

You can then launch the application in Docker:

```bash
docker compose up --build
```

Tests must pass and all secrets must be configured for the container to run
correctly.
