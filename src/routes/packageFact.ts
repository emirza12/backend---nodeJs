import { Router, Request, Response } from 'express';
import LearningFact from '../models/LearningFact';
import LearningPackage from '../models/LearningPackage';

const router = Router();

/**
 * GET /api/package/:id/fact
 * Get all LearningFacts for a given package
 */
router.get('/:id/fact', async (req: Request, res: Response) => {
    const packageId = parseInt(req.params.id, 10);

    try {
        const facts = await LearningFact.findAll({ where: { packageId, disabled: false } });
        res.status(200).json(facts);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error fetching facts', details: errorMessage });
    }
});

/**
 * POST /api/package/:id/fact
 * Create and Add a new Fact to a given package
 */
router.post('/:id/fact', async (req: Request, res: Response) => {
    const packageId = parseInt(req.params.id, 10);
    const { title, description } = req.body;

    try {
        const learningPackage = await LearningPackage.findByPk(packageId);
        if (!learningPackage) {
            return res.status(404).json({ message: `Package not found for id: ${packageId}` });
        }

        const newFact = await LearningFact.create({ title, description, packageId });
        res.status(201).json(newFact);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error creating fact', details: errorMessage });
    }
});

/**
 * PUT /api/package/:id/fact/:factId
 * Update an existing Fact of a given package
 */
router.put('/:id/fact/:factId', async (req: Request, res: Response) => {
    const packageId = parseInt(req.params.id, 10);
    const factId = parseInt(req.params.factId, 10);
    const { title, description } = req.body;

    try {
        const fact = await LearningFact.findOne({ where: { id: factId, packageId } });
        if (!fact) {
            return res.status(404).json({ message: `Fact not found for id: ${factId} in package: ${packageId}` });
        }

        fact.title = title;
        fact.description = description;
        await fact.save();

        res.status(200).json(fact);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error updating fact', details: errorMessage });
    }
});

/**
 * DELETE /api/package/:id/fact/:factId
 * Mark a Fact as disabled (soft delete)
 */
router.delete('/:id/fact/:factId', async (req: Request, res: Response) => {
    const packageId = parseInt(req.params.id, 10);
    const factId = parseInt(req.params.factId, 10);

    try {
        const fact = await LearningFact.findOne({ where: { id: factId, packageId } });
        if (!fact) {
            return res.status(404).json({ message: `Fact not found for id: ${factId} in package: ${packageId}` });
        }

        fact.disabled = true;
        await fact.save();

        res.status(200).json({ message: 'Fact marked as disabled' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error deleting fact', details: errorMessage });
    }
});

export default router;
