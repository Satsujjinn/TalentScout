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
### server tests failed

```
Error: Command failed: npm test --silent
FAIL __tests__/auth.test.ts (22.963 s)
  ● auth flow › registers and logs in

    Download failed for url "https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2404-6.0.5.tgz", Details:
    Status Code is 403 (MongoDB's 404)
    This means that the requested version-platform combination doesn't exist
    Try to use different version 'new MongoMemoryServer({ binary: { version: 'X.Y.Z' } })'
    List of available versions can be found here: https://www.mongodb.com/download-center/community/releases/archive

      at RedirectableRequest.<anonymous> (../node_modules/mongodb-memory-server-core/src/util/MongoBinaryDownload.ts:426:17)
      at RedirectableRequest.Object.<anonymous>.RedirectableRequest._processResponse (../node_modules/follow-redirects/index.js:409:10)
      at ClientRequest.RedirectableRequest._onNativeResponse (../node_modules/follow-redirects/index.js:102:12)

  ● auth flow › rejects invalid login

    Download failed for url "https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2404-6.0.5.tgz", Details:
    Status Code is 403 (MongoDB's 404)
    This means that the requested version-platform combination doesn't exist
    Try to use different version 'new MongoMemoryServer({ binary: { version: 'X.Y.Z' } })'
    List of available versions can be found here: https://www.mongodb.com/download-center/community/releases/archive

      at RedirectableRequest.<anonymous> (../node_modules/mongodb-memory-server-core/src/util/MongoBinaryDownload.ts:426:17)
      at RedirectableRequest.Object.<anonymous>.RedirectableRequest._processResponse (../node_modules/follow-redirects/index.js:409:10)
      at ClientRequest.RedirectableRequest._onNativeResponse (../node_modules/follow-redirects/index.js:102:12)

  ● auth flow › lists talents with valid token

    Download failed for url "https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2404-6.0.5.tgz", Details:
    Status Code is 403 (MongoDB's 404)
    This means that the requested version-platform combination doesn't exist
    Try to use different version 'new MongoMemoryServer({ binary: { version: 'X.Y.Z' } })'
    List of available versions can be found here: https://www.mongodb.com/download-center/community/releases/archive

      at RedirectableRequest.<anonymous> (../node_modules/mongodb-memory-server-core/src/util/MongoBinaryDownload.ts:426:17)
      at RedirectableRequest.Object.<anonymous>.RedirectableRequest._processResponse (../node_modules/follow-redirects/index.js:409:10)
      at ClientRequest.RedirectableRequest._onNativeResponse (../node_modules/follow-redirects/index.js:102:12)


  ● Test suite failed to run

    thrown: "Exceeded timeout of 20000 ms for a hook.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      14 |     await mongoose.connect(mongo.getUri());
      15 |   });
    > 16 |   afterAll(async () => {
         |   ^
      17 |     await mongoose.disconnect();
      18 |     await mongo.stop();
      19 |   });

      at __tests__/auth.test.ts:16:3
      at Object.<anonymous> (__tests__/auth.test.ts:10:1)

Jest: "global" coverage threshold for branches (50%) not met: 33.33%
Jest: "global" coverage threshold for functions (50%) not met: 0%
Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        23.288 s, estimated 27 s
Ran all test suites.
Jest did not exit one second after the test run has completed.

'This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.

```
## Outdated packages for web
none
### web .env.example

```
NEXT_PUBLIC_API_URL=http://localhost:3001
# Required for signing JWTs
JWT_SECRET=your_jwt_secret

```
### web tests failed

```
Error: Command failed: npm test --silent
Error: ● Validation Error:

  Test environment jest-environment-jsdom cannot be found. Make sure the testEnvironment configuration option points to an existing node module.

  Configuration Documentation:
  https://jestjs.io/docs/configuration


As of Jest 28 "jest-environment-jsdom" is no longer shipped by default, make sure to install it separately.

```
