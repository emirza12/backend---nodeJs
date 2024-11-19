import { Router, Request, Response } from 'express';

const router: Router = Router();


/**
 * @openapi
 * /:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns a status message to indicate that the server is running.
 *     responses:
 *       200:
 *         description: Server is running.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 */
 router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'OK' });
 });



export default router;
