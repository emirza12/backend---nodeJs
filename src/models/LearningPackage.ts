// src/models/LearningPackage.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../seque';

export class LearningPackage extends Model {
    declare id: number;
    declare title: string;
    declare description: string;
    declare category: string;
    declare targetAudience: string;
    declare difficultyLevel: number;
}

LearningPackage.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    targetAudience: { type: DataTypes.STRING, allowNull: false },
    difficultyLevel: { type: DataTypes.INTEGER, allowNull: false }
}, {
    sequelize,
    modelName: 'LearningPackage',
    tableName: 'LearningFactDb' 
});

export default LearningPackage;

// To ensure the table is created, you might want to sync in development:
sequelize.sync({ alter: true });