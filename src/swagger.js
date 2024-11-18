"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Swagger configuration
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Learning Package API',
            version: '1.0.0',
            description: 'API documentation for the Learning Package system',
        },
        components: {
            schemas: {
                LearningPackage: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'The unique identifier of the learning package',
                        },
                        title: {
                            type: 'string',
                            description: 'The title of the learning package',
                        },
                        description: {
                            type: 'string',
                            description: 'A description of the learning package',
                        },
                        category: {
                            type: 'string',
                            description: 'The category of the learning package',
                        },
                        targetAudience: {
                            type: 'string',
                            description: 'The target audience of the learning package',
                        },
                        difficultyLevel: {
                            type: 'integer',
                            description: 'The difficulty level of the learning package (1-20)',
                        },
                    },
                    required: ['title', 'description', 'category', 'targetAudience', 'difficultyLevel'],
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function setupSwagger(app) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
}
