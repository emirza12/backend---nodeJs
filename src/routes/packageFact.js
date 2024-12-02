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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LearningFact_1 = __importDefault(require("../models/LearningFact"));
const LearningPackage_1 = __importDefault(require("../models/LearningPackage"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/package/{id}/fact:
 *   get:
 *     summary: Get all LearningFacts for a given package
 *     tags:
 *       - LearningFacts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the package
 *     responses:
 *       200:
 *         description: List of facts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Error fetching facts
 */
router.get('/:id/fact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const packageId = parseInt(req.params.id, 10);
    try {
        const facts = yield LearningFact_1.default.findAll({ where: { packageId, disabled: false } });
        res.status(200).json(facts);
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: 'Error fetching facts', details: errorMessage });
    }
}));
/**
 * @swagger
 * /api/package/{id}/fact:
 *   post:
 *     summary: Create and add a new fact to a package
 *     tags:
 *       - LearningFacts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the package
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fact created successfully
 *       404:
 *         description: Package not found
 *       500:
 *         description: Error creating fact
 */
router.post('/:id/fact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const packageId = parseInt(req.params.id, 10);
    const { title, description } = req.body;
    try {
        const learningPackage = yield LearningPackage_1.default.findByPk(packageId);
        if (!learningPackage) {
            return res.status(404).json({ message: `Package not found for id: ${packageId}` });
        }
        const newFact = yield LearningFact_1.default.create({ title, description, packageId });
        res.status(201).json(newFact);
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: 'Error creating fact', details: errorMessage });
    }
}));
/**
 * @swagger
 * /api/package/{id}/fact/{factId}:
 *   put:
 *     summary: Update an existing fact of a package
 *     tags:
 *       - LearningFacts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the package
 *       - name: factId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the fact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fact updated successfully
 *       404:
 *         description: Fact not found
 *       500:
 *         description: Error updating fact
 */
router.put('/:id/fact/:factId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const packageId = parseInt(req.params.id, 10);
    const factId = parseInt(req.params.factId, 10);
    const { title, description } = req.body;
    try {
        const fact = yield LearningFact_1.default.findOne({ where: { id: factId, packageId } });
        if (!fact) {
            return res.status(404).json({ message: `Fact not found for id: ${factId} in package: ${packageId}` });
        }
        fact.title = title;
        fact.description = description;
        yield fact.save();
        res.status(200).json(fact);
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: 'Error updating fact', details: errorMessage });
    }
}));
/**
 * @swagger
 * /api/package/{id}/fact/{factId}:
 *   delete:
 *     summary: Mark a fact as disabled (soft delete)
 *     tags:
 *       - LearningFacts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the package
 *       - name: factId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the fact
 *     responses:
 *       200:
 *         description: Fact marked as disabled
 *       404:
 *         description: Fact not found
 *       500:
 *         description: Error deleting fact
 */
router.delete('/:id/fact/:factId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const packageId = parseInt(req.params.id, 10);
    const factId = parseInt(req.params.factId, 10);
    try {
        const fact = yield LearningFact_1.default.findOne({ where: { id: factId, packageId } });
        if (!fact) {
            return res.status(404).json({ message: `Fact not found for id: ${factId} in package: ${packageId}` });
        }
        fact.disabled = true;
        yield fact.save();
        res.status(200).json({ message: 'Fact marked as disabled' });
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: 'Error deleting fact', details: errorMessage });
    }
}));
exports.default = router;
