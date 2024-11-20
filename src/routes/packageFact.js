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
 * GET /api/package/:id/fact
 * Get all LearningFacts for a given package
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
 * POST /api/package/:id/fact
 * Create and Add a new Fact to a given package
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
 * PUT /api/package/:id/fact/:factId
 * Update an existing Fact of a given package
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
 * DELETE /api/package/:id/fact/:factId
 * Mark a Fact as disabled (soft delete)
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
