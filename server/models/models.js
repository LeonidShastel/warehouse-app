const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    weight: {type: DataTypes.DOUBLE},
    date_production: {type: DataTypes.DATE},
    date_expiration: {type: DataTypes.DATE},
    consumed_components: {type: DataTypes.DOUBLE},
    price: {type: DataTypes.DECIMAL},
    img: {type: DataTypes.STRING},
})

const Statuses = sequelize.define('statuses',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const Shipments = sequelize.define('shipments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER},
    date: {type: DataTypes.DATE},
})

const Staff = sequelize.define('staff',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lastname: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    patronymic: {type: DataTypes.STRING}
})

Statuses.hasMany(Product);
Product.belongsTo(Statuses);

Product.hasMany(Shipments);
Shipments.belongsTo(Product);

Staff.hasMany(Shipments);
Shipments.belongsTo(Staff);

module.exports = {
    Product,
    Statuses,
    Shipments,
    Staff
}





