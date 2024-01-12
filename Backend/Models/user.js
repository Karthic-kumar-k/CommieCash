module.exports = (sequelize, DataTypes) =>{

  const User = sequelize.define
      (   'user' ,
      {   name : DataTypes.STRING,
          // createdBy : DataTypes.STRING,
          createdAt : DataTypes.DATE,
          // modifiedBy : DataTypes.STRING
      } ,

      {   freezeTableName : true
      }
  )

  return User;
}