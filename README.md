# ts-tutorial

This is a RESTful API project built with TypeScript, Node.js, and Express.

## Project Overview

This project implements user-related APIs, including CRUD operations. The structure is clear and suitable for learning and practicing TypeScript backend development.

## Directory Structure

```
jest.config.js
nodemon.json
package.json
tsconfig.json
src/
  index.ts
  server.ts
  controllers/
    users.controller.ts
  routes/
    index.ts
    users.route.ts
  services/
    users.service.ts
  types/
    api-response.ts
    user.ts
test/
  controllers/
    users.test.ts
  services/
    users.service.test.ts
```

## How to Install

1. Clone the repository:

   ```bash
   git clone https://github.com/coderjingtao/TypeScript-Tutorial.git
   cd TypeScript-Tutorial
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Copy and edit environment variables:

   ```bash
   cp .env.example .env
   # Edit .env as needed
   ```

## How to Access the API

1. Start the server:

   ```bash
   npm run dev
   ```

   The default port is `3000`.

2. Main user-related endpoints:

   - Get all users:
     ```http
     GET /api/users
     ```
   - Get a specific user:
     ```http
     GET /api/users/:id
     ```
   - Create a user:
     ```http
     POST /api/users
     Content-Type: application/json
     {
       "name": "username",
       "email": "email"
     }
     ```
   - Update a user:
     ```http
     PUT /api/users/:id
     Content-Type: application/json
     {
       "name": "new username",
       "email": "new email"
     }
     ```
   - Delete a user:
     ```http
     DELETE /api/users/:id
     ```

3. You can use Postman, curl, or any other HTTP client to test the endpoints.

## How to Test the API

1. Run tests:

```bash
npm run test
```

This will automatically run all unit tests in the `test/` directory.

2. Testing framework:

- [Jest](https://jestjs.io/) is used for unit testing.
- Test files are located in `test/controllers/` and `test/services/`.

3. Test coverage:

- Main features of user services and controllers.

---

---

If you have any questions or suggestions, feel free to open an issue or submit a PR.
