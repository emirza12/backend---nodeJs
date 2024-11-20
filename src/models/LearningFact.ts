import { DataTypes, Model } from 'sequelize';
import sequelize from '../seque';
import LearningPackage from './LearningPackage';


class LearningFact extends Model {

    public id!: number;

    public title!: string;

    public description!: string;

    public packageId!: number;

    public disabled!: boolean;

}


LearningFact.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    packageId: {
        type: DataTypes.INTEGER,
        references: {
            model: LearningPackage,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'LearningFact',
    tableName: 'LearningFacts',
});

LearningPackage.hasMany(LearningFact, { foreignKey: 'packageId', as: 'facts' });
LearningFact.belongsTo(LearningPackage, { foreignKey: 'packageId', as: 'package' });

export default LearningFact;
