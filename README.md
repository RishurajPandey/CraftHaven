# 🛍️ CraftHaven

<p align="center">
  <b>A Full-Stack MERN Marketplace for Handmade Products</b><br>
  Connecting local artisans with customers through a modern, responsive e-commerce platform.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb" />
  <img src="https://img.shields.io/badge/JWT-Authentication-orange" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel" />
  <img src="https://img.shields.io/badge/Render-Backend-46E3B7" />
</p>

---

## 🌐 Live Demo

**Frontend:** https://craft-haven-phi.vercel.app

**Backend API:** https://crafthaven-backend.onrender.com

---

## 📖 Overview

CraftHaven is a full-stack MERN marketplace designed to support local artisans by providing an online platform to showcase and sell handcrafted products.

The application features secure authentication, product management, shopping functionality, and a responsive user interface, making it a scalable foundation for a real-world e-commerce platform.

---

# ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes

### 🛍️ Product Management

- Browse all products
- View product details
- Search products
- Category filtering
- Featured products
- Complete Product CRUD API

### 🛒 Shopping Experience

- Add products to cart
- Update cart quantity
- Remove items from cart
- Responsive shopping interface

### ⚡ Backend Features

- RESTful API
- MongoDB Integration
- Express Middleware
- Secure Authentication
- Error Handling
- Environment Configuration

### 🎨 User Interface

- Responsive Design
- Mobile Friendly
- Modern React Components
- Fast Vite Build
- Clean UI with Tailwind CSS

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- JavaScript (ES6+)

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

# 📂 Project Structure

```text
CraftHaven
│
├── frontend
│   ├── src
│   ├── public
│   └── ...
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── config
│   │   └── utils
│   ├── server.js
│   └── ...
│
└── README.md
```

---

# 🚀 Running Locally

## Clone Repository

```bash
git clone https://github.com/RishurajPandey/CraftHaven.git
cd CraftHaven
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Run the backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:5000
```

Run

```bash
npm run dev
```

---

# 🔗 API Overview

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/users/register` | Register user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/me` | Current user |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

---

# 📈 Future Enhancements

- Wishlist
- Product Reviews
- Ratings
- Online Payments
- Order Management
- Admin Dashboard
- Artisan Dashboard
- Cloudinary Image Upload
- Email Notifications

---

# 💡 Key Learnings

During the development of CraftHaven, I gained practical experience in:

- Building RESTful APIs using Express.js
- MongoDB schema design with Mongoose
- JWT-based authentication and authorization
- Secure password hashing with bcrypt
- Connecting React frontend with Express backend
- Deploying full-stack MERN applications using Vercel and Render
- Managing environment variables and production deployment
- Structuring scalable full-stack applications

---

# 👨‍💻 Author

**Rishuraj Pandey**

GitHub: https://github.com/RishurajPandey

---

# 📸 Screenshots

## 🏠 Home Page

![Home](./screenshots/Home.png)

---

## 🛍️ Product Page

![Product](./screenshots/Product.png)

---

⭐ If you found this project interesting, consider giving it a star!
