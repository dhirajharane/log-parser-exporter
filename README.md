# Log Parser & Exporter

A robust Node.js + Express + MongoDB application for parsing, storing, searching, and exporting log files. Features REST APIs for authentication and log management, real-time log updates via WebSocket, and interactive API documentation with Swagger.

---

## 🚀 Features

- **User Authentication** (JWT, secure cookies)
- **Log File Upload** (`.log` and `.json` supported)
- **Log Search & Filtering** (by level, keyword, date)
- **Export Logs** (CSV/JSON)
- **Log Summary** (aggregation by level)
- **Real-time Log Updates** (WebSocket)
- **Swagger API Docs**
- **Dockerized** (App + MongoDB)
- **Security Best Practices** (Helmet, CORS, input validation)
- **Unit Tests** (Jest, Supertest)

---

## 📦 Project Structure

```
src/
  app.js                # Main Express app
  config/database.js    # MongoDB connection
  docs/                 # Swagger docs
  middlewares/          # Auth middleware
  models/               # Mongoose models
  routes/               # Express routes
  services/             # WebSocket service
  utils/                # Log parser, multer config
tests/                  # Jest/Supertest tests
Dockerfile
docker-compose.yml
.env.example
```

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [MongoDB](https://www.mongodb.com/) (if running locally, not via Docker)

---

## ⚡ Quick Start

### 1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/log-parser-exporter.git
cd log-parser-exporter
```

### 2. **Environment Variables**

Copy `.env.example` to `.env` and fill in your secrets:

```bash
cp .env.example .env
```

**Example:**
```
DB_CONNECTION_SECRET=mongodb://mongo:27017/logparserdb  # Use in Docker
# DB_CONNECTION_SECRET=mongodb://localhost:27017/logparserdb  # Use if running locally without Docker

JWT_SECRET=yourStrongSecret
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 3. **Run with Docker (Recommended)**

```bash
docker-compose up --build
```

- App: [http://localhost:7777](http://localhost:7777)
- MongoDB: [mongodb://localhost:27017/logparserdb](mongodb://localhost:27017/logparserdb)
- Swagger Docs: [http://localhost:7777/api-docs](http://localhost:7777/api-docs)

### 4. **Run Locally (Node.js)**

```bash
npm install
npm run dev
```

---

## 🧑‍💻 Usage

### **Authentication**

- **POST `/signup`** – Register a new user
- **POST `/login`** – Login and receive JWT cookie
- **POST `/logout`** – Logout (clears cookie)

### **Log Management**

- **POST `/logs/upload`** – Upload `.log` or `.json` file (authenticated)
- **GET `/logs`** – Search/filter logs (authenticated)
- **GET `/logs/export`** – Export logs as CSV/JSON (authenticated)
- **GET `/logs/summary`** – Get log summary by level (authenticated)

### **WebSocket**

- Connect to `ws://localhost:7777` for real-time log updates.

### **API Documentation**

- Interactive Swagger UI: [http://localhost:7777/api-docs](http://localhost:7777/api-docs)

---

## 🧪 Testing

Run all tests with:

```bash
npm test
```

- Uses [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest)
- Test files are in the `tests/` directory

---

## 🔒 Security & Best Practices

- **Helmet** for HTTP headers
- **CORS** configured for frontend origin
- **Input validation** (email, password, log files)
- **JWT** stored in HTTP-only cookies
- **Password hashing** with bcrypt
- **Centralized error handling**

---

## 🐳 Docker & Deployment

- **Dockerfile**: Production-ready, uses Node.js 18 Alpine
- **docker-compose.yml**: Runs app and MongoDB with persistent volume
- **Environment variables** are passed via `.env` or Compose

**To deploy:**
1. Set strong secrets in `.env`
2. Build and run with Docker Compose
3. Use a reverse proxy (e.g., Nginx) for HTTPS in production

---

## 📄 API Reference

See [Swagger UI](http://localhost:7777/api-docs) for full API details and example requests.

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📧 License & Author

- **License:** ISC
- **Author:** Dhiraj Harane

---

## 💡 Tips

- For production, set `NODE_ENV=production` and use strong secrets.
- Use HTTPS and a reverse proxy for secure cookie transmission.
- Adjust CORS and rate limiting as needed for your frontend.

---

**Happy Logging