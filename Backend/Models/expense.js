module.exports = (sequelize, DataTypes) =>{

  const Expense = sequelize.define
      (   'expense' ,
      {   name : DataTypes.STRING,
          groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              key: "id",
              model: "group",
          }
        },
          amount : DataTypes.INTEGER,
          description : DataTypes.STRING,
          createdBy : DataTypes.STRING,
          createdAt : DataTypes.DATE,
          modifiedBy : DataTypes.STRING
      } ,

      {   freezeTableName : true
      }
  )

  return Expense;
}