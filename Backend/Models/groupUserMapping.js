module.exports = (sequelize) =>{

  const GroupUserMapping = sequelize.define
      (   'group_user_mapping' ,
      {} ,

      {   freezeTableName : true
      }
  )
  return GroupUserMapping;
}