const express = require("express");
const fs = require("fs/promises");
const { Parser } = require("json2csv");
const LogEntry = require("../models/log.model");
const { parseLogContent } = require("../utils/logParser");
const { broadcastLogUpdate } = require("../services/websocket");
const { userAuth } = require("../middlewares/auth");
const upload = require("../utils/multer");

const logsRouter = express.Router();

//  Upload log file and store parsed logs in DB
logsRouter.post(
  "/logs/upload",
  userAuth,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      const filePath = req.file.path;
      const fileContent = await fs.readFile(filePath, "utf-8");

      const isJson = req.file.mimetype === "application/json";
      const logEntries = parseLogContent(
        fileContent,
        isJson,
        req.file.originalname
      );

      await LogEntry.create(logEntries);

      broadcastLogUpdate({
        event: "NEW_LOGS",
        count: logEntries.length,
        source: req.file.originalname,
        timestamp: new Date(),
      });

      // Clean up uploaded file
      await fs.unlink(filePath);

      res.status(201).json({
        message: "Log file processed successfully.",
        count: logEntries.length,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

//  Get logs with filters, search, pagination
logsRouter.get("/logs", userAuth, async (req, res) => {
  try {
    const {
      level,
      keyword,
      startDate,
      endDate,
      page = 1,
      limit = 50,
    } = req.query;

    const query = {};
    if (level) query.logLevel = level.toUpperCase();
    if (keyword) query.message = { $regex: keyword, $options: "i" };
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const logs = await LogEntry.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ timestamp: -1 });

    const total = await LogEntry.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: logs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  Export logs as CSV or JSON
logsRouter.get("/logs/export", userAuth, async (req, res) => {
  try {
    const { level, keyword, startDate, endDate, format = "json" } = req.query;

    const query = {};
    if (level) query.logLevel = level.toUpperCase();
    if (keyword) query.message = { $regex: keyword, $options: "i" };
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const logs = await LogEntry.find(query);

    if (format === "csv") {
      const fields = [
        "timestamp",
        "logLevel",
        "message",
        "ip",
        "method",
        "url",
        "statusCode",
        "source",
      ];
      const parser = new Parser({ fields });
      const csv = parser.parse(logs);
      res.header("Content-Type", "text/csv");
      res.header("Content-Disposition", 'attachment; filename="logs.csv"');
      return res.send(csv);
    } else {
      res.header("Content-Type", "application/json");
      return res.json(logs);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      await fs.unlink(filePath);
    }
  }
});

// Summary aggregation
logsRouter.get("/logs/summary", userAuth, async (req, res) => {
  try {
    const summary = await LogEntry.aggregate([
      { $group: { _id: "$logLevel", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = logsRouter;
