/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: API for log ingestion, search, export, and summary
 */

/**
 * @swagger
 * /logs/upload:
 *   post:
 *     summary: Upload and parse a log file
 *     tags: [Logs]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Log file processed successfully
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Get logs with filters, search, pagination
 *     tags: [Logs]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Logs fetched successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /logs/export:
 *   get:
 *     summary: Export logs as CSV or JSON
 *     tags: [Logs]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [json, csv]
 *     responses:
 *       200:
 *         description: Logs exported
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /logs/summary:
 *   get:
 *     summary: Get log summary by level
 *     tags: [Logs]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Summary returned
 *       500:
 *         description: Server error
 */



 
