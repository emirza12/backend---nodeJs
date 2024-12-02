"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const liveness_1 = __importDefault(require("./src/routes/liveness"));
const package_1 = __importDefault(require("./src/routes/package"));
const package_summaries_1 = __importDefault(require("./src/routes/package-summaries"));
const swagger_1 = require("./src/swagger");
const packageFact_1 = __importDefault(require("./src/routes/packageFact"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware (optional)
app.use(express_1.default.json());
// Register Swagger documentation
(0, swagger_1.setupSwagger)(app);
// Routes
app.use('/api/liveness', liveness_1.default);
app.use('/api/package', package_1.default);
app.use('/api/package-summaries', package_summaries_1.default);
app.use('/api/package', packageFact_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
