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

### Order requests
- POST /api/orders

This records a customer's contact and delivery details, the requested items, and
an estimated total with a `pending` status. It is an order request only; it does
not process payment, notify an artisan, or reserve inventory. The saved request
must be followed up separately to confirm the order, delivery, and payment.

Example request:
```json
{
  "name": "Alex Buyer",
  "email": "alex@example.com",
  "phone": "555-0100",
  "address": "123 Craft Street",
  "notes": "Please contact me in the afternoon",
  "items": [
    {
      "productId": 1,
      "name": "Handwoven Ceramic Bowl Set",
      "artisan": "Sarah Chen",
      "price": 85,
      "quantity": 2
    }
  ]
}
```

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
