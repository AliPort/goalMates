'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Goal, User }) {
      // User
      Mate.belongsToMany(User, {
        foreignKey: "user.username",
        as: "goalmates",
        through: Goal
      })
      
      // Goal 
      Mate.hasMany(Goal, {
        foreignKey: "goal_id",
        as: "goalmates"
      })
     
    }
  }
  Mate.init({
    mate_id: {type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true},
    name: DataTypes.STRING,
    join_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Mate',
    tableName: 'mates',
    timestamps: false
  });
  return Mate;
};