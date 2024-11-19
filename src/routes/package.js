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
