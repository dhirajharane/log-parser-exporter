
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  logLevel: {
    type: String,
    required: true,
    enum: ['INFO', 'ERROR', 'WARN', 'DEBUG', 'TRACE', 'FATAL', 'OTHER'], 
    default: 'OTHER'
  },
  message: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
  },
  method: {
    type: String,
  },
  url: {
    type: String,
  },
  statusCode: {
    type: Number,
  },
  raw: {
    type: String,
    required: true,
  },
  source: {
    type: String, 
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('LogEntry', logSchema);
