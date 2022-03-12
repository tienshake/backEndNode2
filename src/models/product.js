'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Product.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
            // Product.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
            // Product.hasOne(models.Markdown, { foreignKey: 'doctorId' });
            // Product.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' });

        }
    };

    Product.init({
        idItem: DataTypes.STRING,
        addressItem: DataTypes.STRING,
        nameItem: DataTypes.STRING,
        keyId: DataTypes.STRING,
        buyer: DataTypes.STRING,
        state: DataTypes.STRING,
        price: DataTypes.STRING,
        image: DataTypes.STRING,
        cart: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};