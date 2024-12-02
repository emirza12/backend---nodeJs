import { Router, Request, Response } from 'express';
import LearningFact from '../models/LearningFact';
import LearningPackage from '../models/LearningPackage';

const router = Router();

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
