'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Password extends Model {}
  
  Password.init({
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'user',
      timestamps: false
    })
    return User
  }
