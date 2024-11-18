import { Router, Request, Response } from 'express';
import learningPackages from '../data/learningpackage';

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
router.get('/', (req: Request, res: Response) => {
    const summaries = learningPackages.map(lp => ({ id: lp.id, title: lp.title }));
    res.status(200).json(summaries);
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
router.get('/search', (req: Request, res: Response) => {
  const { title, description, category } = req.query;

  // Filter the packages based on query parameters
  const filteredPackages = learningPackages.filter(lp => {
    const matchesTitle = title
      ? lp.title.toLowerCase().includes((title as string).toLowerCase())
      : true;
    const matchesDescription = description
      ? lp.description.toLowerCase().includes((description as string).toLowerCase())
      : true;
    const matchesCategory = category
      ? lp.category.toLowerCase().includes((category as string).toLowerCase())
      : true;

    return matchesTitle && matchesDescription && matchesCategory;
  });

  // Return only summaries (id and title)
  const summaries = filteredPackages.map(lp => ({ id: lp.id, title: lp.title }));
  res.status(200).json(summaries);
});

  export default router;
  