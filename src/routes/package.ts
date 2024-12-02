import { Router, Request, Response } from 'express';
import { LearningPackage } from '../models/LearningPackage';
import { ValidationError } from 'sequelize';

interface LearningPackageInput {
    title: string;
    description: string;
    category: string;
    targetAudience: string;
    difficultyLevel: number;
}

const router: Router = Router();

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
router.get('/', async (req: Request, res: Response) => {
    try {
        const packages = await LearningPackage.findAll();
        res.status(200).json(packages);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error retrieving data', details: errorMessage });
    }
});

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
router.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const learningPackage = await LearningPackage.findByPk(id);
        if (learningPackage) {
            res.status(200).json(learningPackage);
        } else {
            res.status(404).json({ message: `Entity not found for id: ${id}` });
        }
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error retrieving data', details: errorMessage });
    }
});

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
router.post('/', async (req: Request, res: Response) => {
    const { title, description, category, targetAudience, difficultyLevel } = req.body as LearningPackageInput;
    try {
        const newPackage = await LearningPackage.create({ title, description, category, targetAudience, difficultyLevel });
        res.status(201).json(newPackage);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: 'Validation failed', details: error.errors });
        } else {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: 'Error creating new package', details: errorMessage });
        }
    }
});

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
router.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { title, description, category, targetAudience, difficultyLevel } = req.body as LearningPackageInput;

    try {
        const learningPackage = await LearningPackage.findByPk(id);
        if (!learningPackage) {
            return res.status(404).json({ message: `Entity not found for id: ${id}` });
        }

        learningPackage.title = title;
        learningPackage.description = description;
        learningPackage.category = category;
        learningPackage.targetAudience = targetAudience;
        learningPackage.difficultyLevel = difficultyLevel;
        
        await learningPackage.save();
        res.status(200).json(learningPackage);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: 'Validation failed', details: error.errors });
        } else {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: 'Error updating package', details: errorMessage });
        }
    }
});

export default router;
