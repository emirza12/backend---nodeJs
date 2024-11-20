"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const seque_1 = __importDefault(require("../seque"));
const LearningPackage_1 = __importDefault(require("./LearningPackage"));
class LearningFact extends sequelize_1.Model {
}
LearningFact.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    disabled: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    packageId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: LearningPackage_1.default,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize: seque_1.default,
    modelName: 'LearningFact',
    tableName: 'LearningFacts',
});
LearningPackage_1.default.hasMany(LearningFact, { foreignKey: 'packageId', as: 'facts' });
LearningFact.belongsTo(LearningPackage_1.default, { foreignKey: 'packageId', as: 'package' });
exports.default = LearningFact;
