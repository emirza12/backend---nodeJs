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

router.get('/', async (req: Request, res: Response) => {
    try {
        const packages = await LearningPackage.findAll();
        res.status(200).json(packages);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error retrieving data', details: errorMessage });
    }
});

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
