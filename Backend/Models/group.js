const user = require("./user");

module.exports = (sequelize, DataTypes) =>{

  const Group = sequelize.define
      (   'group' ,
      {   name : DataTypes.STRING,
          type : DataTypes.STRING,
          description : DataTypes.STRING,
          createdBy : DataTypes.STRING,
          createdAt : DataTypes.DATE,
          modifiedBy : DataTypes.STRING
      } ,

      {   freezeTableName : true
      }
  )
  return Group;
}