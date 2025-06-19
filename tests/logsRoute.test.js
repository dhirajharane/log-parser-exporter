const request = require('supertest');
const express = require('express');
const logsRouter = require('../src/routes/logs');

// Mock userAuth to always pass
jest.mock('../src/middlewares/auth', () => ({
  userAuth: (req, res, next) => next()
}));

const app = express();
app.use(express.json());
app.use('/', logsRouter);

describe('Logs Route', () => {
  it('should return 400 if no file uploaded', async () => {
    const res = await request(app).post('/logs/upload');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No file uploaded.');
  });

 
});
