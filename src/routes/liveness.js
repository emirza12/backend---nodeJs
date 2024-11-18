"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns a status message to indicate that the server is running.
 *     responses:
 *       200:
 *         description: Server is running.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 */
router.get('/', (req, res) => {
    res.status(200).json({ message: 'OK' });
});
exports.default = router;
