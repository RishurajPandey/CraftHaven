# CraftHaven Backend

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Copy the environment file and update your MongoDB Atlas connection string:
   ```bash
   cp .env.example .env
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Health
- GET /api/health

### Users
- POST /api/users/register
- POST /api/users/login
- GET /api/users/me

### Products
- GET /api/products
- POST /api/products
- GET /api/products/:id
- PUT /api/products/:id
- DELETE /api/products/:id

## Example Requests

### Register user
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'
```

### Login user
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

### Create product
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```
