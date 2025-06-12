## Outdated packages for server
none
### server .env.example

```
MONGO_URI=mongodb://localhost:27017/talentsite
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
PORT=5000
MONGOMS_SYSTEM_BINARY=

```
### server tests

```
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |   88.09 |       50 |   63.63 |   91.25 |                   
 src             |   83.33 |       80 |       0 |   86.95 |                   
  index.ts       |   83.33 |       80 |       0 |   86.95 | 23-24,28          
 src/middleware  |   76.92 |       25 |     100 |   83.33 |                   
  auth.ts        |   76.92 |       25 |     100 |   83.33 | 6,23              
 src/routes      |   93.61 |       40 |   85.71 |   95.55 |                   
  auth.ts        |   89.65 |    33.33 |   66.66 |   92.59 | 8,34              
  leaderboard.ts |     100 |       50 |     100 |     100 | 9                 
  talents.ts     |     100 |      100 |     100 |     100 |                   
-----------------|---------|----------|---------|---------|-------------------

```
## Outdated packages for web
none
### web .env.example

```
# Leave NEXT_PUBLIC_API_URL empty to use built-in mock API routes
#NEXT_PUBLIC_API_URL=http://localhost:3001
# Required for signing JWTs
JWT_SECRET=your_jwt_secret

```
### web tests

```
-------------|---------|----------|---------|---------|-------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------|---------|----------|---------|---------|-------------------
All files    |     100 |      100 |     100 |     100 |                   
 components  |     100 |      100 |     100 |     100 |                   
  Layout.tsx |     100 |      100 |     100 |     100 |                   
 pages       |     100 |      100 |     100 |     100 |                   
  index.tsx  |     100 |      100 |     100 |     100 |                   
-------------|---------|----------|---------|---------|-------------------

```
