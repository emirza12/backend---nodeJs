import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance
const sequelize = new Sequelize('LearningFactDb', 'postgres', (String(process.env.DB_PASSWORD)), {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Error connecting to the database:', err));

export default sequelize;
