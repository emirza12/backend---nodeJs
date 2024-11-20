import express, { Application } from 'express';
import livenessRouter from './src/routes/liveness';
import packageRouter from './src/routes/package';
import packageSummariesRouter from './src/routes/package-summaries';
import { setupSwagger } from './src/swagger';
import packageFact from './src/routes/packageFact';

const app: Application = express();
const PORT = 3000;

// Middleware (optional)
app.use(express.json());

// Register Swagger documentation
setupSwagger(app);

// Routes
app.use('/api/liveness', livenessRouter);
app.use('/api/package', packageRouter);
app.use('/api/package-summaries', packageSummariesRouter);
app.use('/api/packageFact', packageFact);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});


