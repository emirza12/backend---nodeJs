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
const LearningPackage_1 = require("../models/LearningPackage");
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/package:
 *   get:
 *     summary: Retrieve all learning packages
 *     tags:
 *       - LearningPackages
 *     responses:
 *       200:
 *         description: List of all learning packages
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
 *                   category:
 *                     type: string
 *                   targetAudience:
 *                     type: string
 *                   difficultyLevel:
 *                     type: integer
 *       500:
 *         description: Error retrieving data
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packages = yield LearningPackage_1.LearningPackage.findAll();
        res.status(200).json(packages);
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: 'Error retrieving data', details: errorMessage });
    }
}));
/**
 * @swagger
 * /api/package/{id}:
 *   get:
 *     summary: Retrieve a single learning package by ID
 *     tags:
 *       - LearningPackages
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the learning package
 *     responses:
 *       200:
 *         description: The requested learning package
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 category:
 *                   type: string
 *                 targetAudience:
 *                   type: string
 *                 difficultyLevel:
 *                   type: integer
 *       404:
 *         description: Entity not found
 *       500:
 *         description: Error retrieving data
 */
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const learningPackage = yield LearningPackage_1.LearningPackage.findByPk(id);
        if (learningPackage) {
            res.status(200).json(learningPackage);
        }
        else {
            res.status(404).json({ message: `Entity not found for id: ${id}` });
        }
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: 'Error retrieving data', details: errorMessage });
    }
}));
/**
 * @swagger
 * /api/package:
 *   post:
 *     summary: Create a new learning package
 *     tags:
 *       - LearningPackages
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
 *               category:
 *                 type: string
 *               targetAudience:
 *                 type: string
 *               difficultyLevel:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Learning package created successfully
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Error creating new package
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, category, targetAudience, difficultyLevel } = req.body;
    try {
        const newPackage = yield LearningPackage_1.LearningPackage.create({ title, description, category, targetAudience, difficultyLevel });
        res.status(201).json(newPackage);
    }
    catch (error) {
        if (error instanceof sequelize_1.ValidationError) {
            res.status(400).json({ message: 'Validation failed', details: error.errors });
        }
        else {
            const errorMessage = error.message;
            res.status(500).json({ message: 'Error creating new package', details: errorMessage });
        }
    }
}));
/**
 * @swagger
 * /api/package/{id}:
 *   put:
 *     summary: Update an existing learning package
 *     tags:
 *       - LearningPackages
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the learning package
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
 *               category:
 *                 type: string
 *               targetAudience:
 *                 type: string
 *               difficultyLevel:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Learning package updated successfully
 *       404:
 *         description: Entity not found
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Error updating package
 */
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { title, description, category, targetAudience, difficultyLevel } = req.body;
    try {
        const learningPackage = yield LearningPackage_1.LearningPackage.findByPk(id);
        if (!learningPackage) {
            return res.status(404).json({ message: `Entity not found for id: ${id}` });
        }
        learningPackage.title = title;
        learningPackage.description = description;
        learningPackage.category = category;
        learningPackage.targetAudience = targetAudience;
        learningPackage.difficultyLevel = difficultyLevel;
        yield learningPackage.save();
        res.status(200).json(learningPackage);
    }
    catch (error) {
        if (error instanceof sequelize_1.ValidationError) {
            res.status(400).json({ message: 'Validation failed', details: error.errors });
        }
        else {
            const errorMessage = error.message;
            res.status(500).json({ message: 'Error updating package', details: errorMessage });
        }
    }
}));
exports.default = router;
