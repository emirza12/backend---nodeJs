"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningPackage = void 0;
// src/models/LearningPackage.ts
const sequelize_1 = require("sequelize");
const seque_1 = __importDefault(require("../seque"));
class LearningPackage extends sequelize_1.Model {
}
exports.LearningPackage = LearningPackage;
LearningPackage.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    category: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    targetAudience: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    difficultyLevel: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
}, {
    sequelize: seque_1.default,
    modelName: 'LearningPackage',
    tableName: 'LearningFactDb'
});
exports.default = LearningPackage;
// To ensure the table is created, you might want to sync in development:
seque_1.default.sync({ alter: true });
