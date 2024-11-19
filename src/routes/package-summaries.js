"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sequelize_1 = require("sequelize");
const LearningPackage_1 = require("../models/LearningPackage"); // Ensure the model path is correct
const router = (0, express_1.Router)();
/**
 * @openapi
 * /:
 *   get:
 *     summary: Get summaries of LearningPackages
 *     description: Returns a list of all LearningPackages with only their IDs and titles.
 *     responses:
 *       200:
 *         description: A list of LearningPackage summaries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the LearningPackage.
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: The title of the LearningPackage.
 *                     example: Learn TypeScript
 */
// GET /api/package-summaries - Retrieve summaries of all LearningPackages
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summaries = yield LearningPackage_1.LearningPackage.findAll({
            attributes: ['id', 'title'], // Only fetch id and title
        });
        res.status(200).json(summaries);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving data', details: error.message });
    }
}));
/**
 * @openapi
 * /search:
 *   get:
 *     summary: Search LearningPackages
 *     description: Filters LearningPackages by title, description, or category.
 *     parameters:
 *       - name: title
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by title (partial, case-insensitive).
 *         example: Learn
 *       - name: description
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by description (partial, case-insensitive).
 *         example: Advanced
 *       - name: category
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by category (partial, case-insensitive).
 *         example: Programming
 *     responses:
 *       200:
 *         description: Filtered LearningPackages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LearningPackage'
 */
// GET /api/package-summaries/search - Search for LearningPackages based on query parameters
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, category } = req.query;
    try {
        const where = {};
        // Build the WHERE clause based on query parameters
        if (title) {
            where.title = { [sequelize_1.Op.iLike]: `%${title}%` }; // Case-insensitive LIKE
        }
        if (description) {
            where.description = { [sequelize_1.Op.iLike]: `%${description}%` };
        }
        if (category) {
            where.category = { [sequelize_1.Op.iLike]: `%${category}%` };
        }
        const filteredPackages = yield LearningPackage_1.LearningPackage.findAll({
            where,
            attributes: ['id', 'title'], // Only fetch id and title for summaries
        });
        res.status(200).json(filteredPackages);
    }
    catch (error) {
        res.status(500).json({ message: 'Error filtering data', details: error.message });
    }
}));
exports.default = router;
