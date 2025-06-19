require("dotenv").config();  

const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const helmet = require('helmet');
const cors = require('cors');
const { connectDB } = require("./config/database");
const { initWebSocket } = require('./services/websocket');
const authRouter = require("./routes/authRoute");
const logsRouter = require("./routes/logs");
const swaggerUi = require('swagger-ui-express');
const specs = require('./docs/swagger');

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));




// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/", authRouter);   
app.use("/", logsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (optional, recommended)
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 7777;

(async () => {
  try {
    await connectDB();
    console.log("Database connected");
    initWebSocket(server);

    server.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect DB:", err);
    process.exit(1);
  }
})();
