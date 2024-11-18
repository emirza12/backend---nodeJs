"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const learningpackage_1 = __importDefault(require("../data/learningpackage"));
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
router.get('/', (req, res) => {
    const summaries = learningpackage_1.default.map(lp => ({ id: lp.id, title: lp.title }));
    res.status(200).json(summaries);
});
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
router.get('/search', (req, res) => {
    const { title, description, category } = req.query;
    // Filter the packages based on query parameters
    const filteredPackages = learningpackage_1.default.filter(lp => {
        const matchesTitle = title
            ? lp.title.toLowerCase().includes(title.toLowerCase())
            : true;
        const matchesDescription = description
            ? lp.description.toLowerCase().includes(description.toLowerCase())
            : true;
        const matchesCategory = category
            ? lp.category.toLowerCase().includes(category.toLowerCase())
            : true;
        return matchesTitle && matchesDescription && matchesCategory;
    });
    // Return only summaries (id and title)
    const summaries = filteredPackages.map(lp => ({ id: lp.id, title: lp.title }));
    res.status(200).json(summaries);
});
exports.default = router;
