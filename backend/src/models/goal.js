'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ User, Mate }) {
      // Creator
      Goal.belongsTo(User, {
        foreignKey: "user_id",
        as: "creator"
      })

      // Mate
      Goal.belongsTo(Mate, {
        foreignKey: "mate_id",
        as: "goal"
      })
    }
  }
  Goal.init({
      goal_id: {
        type: DataTypes.INTEGER,
        primaryKey: false,
      },
        goalName: {
          type: DataTypes.STRING,
          allowNull: false
      },
       location: {
           type: DataTypes.STRING,
           allowNull: true
       },
    //   online_location: {
    //       type: DataTypes.BOOLEAN,
    //       allowNull: false
    //   },
    //   join_date: {
    //       type: DataTypes.DATE,
    //       allowNull: false
    //   },
    //   profile_pic: {
    //     //this will be a web address for a photo
    //     // default photo web address: https://images.unsplash.com/photo-1556690171-9f6645f4455e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80
    //     type: DataTypes.STRING, 
    //     allowNull: false
    //   },
    //   password: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    //   }
    }, {
      sequelize,
      modelName: 'Goal',
      tableName: 'goals',
      timestamps: false
    })
    return Goal
  }