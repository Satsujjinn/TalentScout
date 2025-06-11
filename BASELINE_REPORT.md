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
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------|---------|----------|---------|---------|-------------------
All files       |   86.11 |       50 |      50 |    89.7 |                   
 src            |   81.81 |       80 |       0 |   85.71 |                   
  index.ts      |   81.81 |       80 |       0 |   85.71 | 21-22,26          
 src/middleware |   76.92 |       25 |     100 |   83.33 |                   
  auth.ts       |   76.92 |       25 |     100 |   83.33 | 6,23              
 src/routes     |   91.89 |    33.33 |      75 |   94.28 |                   
  auth.ts       |   89.65 |    33.33 |   66.66 |   92.59 | 8,34              
  talents.ts    |     100 |      100 |     100 |     100 |                   
----------------|---------|----------|---------|---------|-------------------
  console.error
    MongooseServerSelectionError: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017
        at _handleConnectionErrors (/workspace/TalentScout/server/node_modules/mongoose/lib/connection.js:816:11)
        at NativeConnection.openUri (/workspace/TalentScout/server/node_modules/mongoose/lib/connection.js:791:11) {
      reason: TopologyDescription {
        type: 'Unknown',
        servers: Map(1) { 'localhost:27017' => [ServerDescription] },
        stale: false,
        compatible: true,
        heartbeatFrequencyMS: 10000,
        localThresholdMS: 15,
        setName: null,
        maxElectionId: null,
        maxSetVersion: null,
        commonWireVersion: 0,
        logicalSessionTimeoutMinutes: null
      },
      code: undefined
    }



      at src/index.ts:723:18


```
## Outdated packages for web
none
### web .env.example

```
NEXT_PUBLIC_API_URL=http://localhost:3001
# Required for signing JWTs
JWT_SECRET=your_jwt_secret

```
### web tests

```
-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------|---------|----------|---------|---------|-------------------
All files  |     100 |      100 |     100 |     100 |                   
 index.tsx |     100 |      100 |     100 |     100 |                   
-----------|---------|----------|---------|---------|-------------------

```
