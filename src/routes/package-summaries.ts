import { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import { LearningPackage } from '../models/LearningPackage'; // Ensure the model path is correct

const router: Router = Router();

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
router.get('/', async (req: Request, res: Response) => {
  try {
    const summaries = await LearningPackage.findAll({
      attributes: ['id', 'title'], // Only fetch id and title
    });
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', details: (error as Error).message });
  }
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
router.get('/search', async (req: Request, res: Response) => {
  const { title, description, category } = req.query;

  try {
    const where: any = {};

    // Build the WHERE clause based on query parameters
    if (title) {
      where.title = { [Op.iLike]: `%${title}%` }; // Case-insensitive LIKE
    }
    if (description) {
      where.description = { [Op.iLike]: `%${description}%` };
    }
    if (category) {
      where.category = { [Op.iLike]: `%${category}%` };
    }

    const filteredPackages = await LearningPackage.findAll({
      where,
      attributes: ['id', 'title'], // Only fetch id and title for summaries
    });

    res.status(200).json(filteredPackages);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering data', details: (error as Error).message });
  }
});

export default router;
