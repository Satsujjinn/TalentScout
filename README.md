# TalentScout

This repository mirrors the basic structure of **TalentSite**. The monorepo contains two packages:

- **client/** – static HTML forms for manual testing
- **web/** – Next.js application

## Getting Started

### Setup

```bash
cp web/.env.example web/.env
npm install --workspaces
```

Use **Node.js 18** when installing dependencies. Newer Node versions may fail to
load the `lightningcss` binary that Next.js depends on.
If you see an error like `Cannot find module '../lightningcss.darwin-arm64.node'`,
switch to Node 18 and reinstall packages.

Set a value for `JWT_SECRET` in each `.env` file. The applications will throw
an error if this variable is missing.

### Running Locally

```bash
npm run dev
```



To try the dashboards without a backend, use the `frontend` package which ships with mock data:

```bash
cd frontend
cp .env.local.example .env.local
npm run demo
```

The older `web` package now also supports mock API routes. Copy the example env file, leave `NEXT_PUBLIC_API_URL` empty and run the dev server:

```bash
cd web
cp .env.example .env
npm run dev
```

### Running Tests

```bash
npm test
```

This executes the baseline script which runs unit tests for each package and writes `BASELINE_REPORT.md`.

### Docker Compose

A simple `docker-compose.yml` is provided to run the Next.js app in a container.

## Deployment

Deploy the Next.js app with Vercel or any Node hosting. Remember to set the environment variables shown in the `.env.example` file.

## Production Setup

Before building for production, copy the example environment files and add your
production secrets:

```bash
cp web/.env.example web/.env
# edit this file with real values
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
