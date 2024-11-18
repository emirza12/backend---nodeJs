import { Router, Request, Response } from 'express';
import learningPackages from '../data/learningpackage';

const router: Router = Router();


/**
 * @openapi
 * /api/package:
 *   get:
 *     summary: Get all learning packages
 *     responses:
 *       200:
 *         description: A list of learning packages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LearningPackage'
 */
// GET /api/package - Récupérer tous les LearningPackages
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(learningPackages);
});



/**
 * @openapi
 * /api/package/{id}:
 *   get:
 *     summary: Get a learning package by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the learning package
 *     responses:
 *       200:
 *         description: A learning package.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningPackage'
 *       404:
 *         description: Entity not found
 */
 // GET /api/package/:id - Récupérer un LearningPackage par son ID
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const learningPackage = learningPackages.find(lp => lp.id === id);

  if (learningPackage) {
    res.status(200).json(learningPackage);
  } else {
    res.status(404).json({ message: `Entity not found for id: ${id}` });
  }
});



/**
 * @openapi
 * /api/package:
 *   post:
 *     summary: Create a new learning package
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackage'
 *     responses:
 *       200:
 *         description: The created learning package.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningPackage'
 *       400:
 *         description: Invalid input
 */
// POST /api/package - Créer un nouveau LearningPackage
router.post('/api/package', (req: Request, res: Response) => {
  const { title, description, category, targetAudience, difficultyLevel } = req.body;

  // Valider les champs obligatoires
  if (!title || !description || !category || !targetAudience || difficultyLevel === undefined) {
    return res.status(400).json({ message: 'All fields are mandatory.' });
  }

  // Créer un nouveau package avec un ID unique
  const newId = learningPackages.length ? Math.max(...learningPackages.map(lp => lp.id)) + 1 : 1;
  const newLearningPackage = {
    id: newId,
    title,
    description,
    category,
    targetAudience,
    difficultyLevel: parseInt(difficultyLevel, 10),
  };

  learningPackages.push(newLearningPackage);
  res.status(200).json(newLearningPackage);
});



/**
 * @openapi
 * /api/package:
 *   put:
 *     summary: Update an existing LearningPackage
 *     description: Updates a LearningPackage by ID. All fields are required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the LearningPackage.
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: Learn TypeScript
 *               description:
 *                 type: string
 *                 example: Master TypeScript for scalable projects.
 *               category:
 *                 type: string
 *                 example: Programming
 *               targetAudience:
 *                 type: string
 *                 example: Developers
 *               difficultyLevel:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Successfully updated the LearningPackage.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: LearningPackage not found.
 */
// PUT /api/package - Update an existing LearningPackage
router.put('/api/package', (req: Request, res: Response) => {
    const { id, title, description, category, targetAudience, difficultyLevel } = req.body;
  
    // Validate mandatory fields
    if (!id || !title || !description || !category || !targetAudience || difficultyLevel === undefined) {
      return res.status(400).json({ message: 'All fields are mandatory, including id.' });
    }
  
    // Find the package by ID
    const learningPackage = learningPackages.find(lp => lp.id === id);
  
    if (!learningPackage) {
      return res.status(404).json({ message: `Entity not found for id: ${id}` });
    }
  
    // Update the package
    learningPackage.title = title;
    learningPackage.description = description;
    learningPackage.category = category;
    learningPackage.targetAudience = targetAudience;
    learningPackage.difficultyLevel = parseInt(difficultyLevel, 10);
  
    res.status(200).json(learningPackage);
  });


  

export default router;
