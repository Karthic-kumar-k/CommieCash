const { models : {User}} = require ('../Models');

module.exports = {

  create : async(name, createdBy, modifiedBy, callback) =>{
    User.create({
      name : name,
      // createdBy : createdBy,
      createdAt : new Date(),
      // modifiedBy : modifiedBy
    })
    .then((uId) =>{
      return callback(null, uId);

    })
    .catch(async (err) =>{
      return callback(Error(err))
    });
  },

  findOne : async(userName, callback) => {
    var condition = { where: {  name : userName } };

    User.findOne(condition)
    .then(async (user) => {
        return callback(null, user);
    })
    .catch((err) => {
      return callback(Error(err))
    });
  },

  delete : async(userId, callback) => {
    User.destroy({
      where: {
        id: userId,
      },
      individualHooks: true, // To Ensure that hooks are triggered for associations
    })
    .then((numDeleted) => {
      if (numDeleted > 0) {
        return callback(null, `User with ID ${userId} and associated entries deleted successfully.`);
      }
      else {
        return callback(new Error(`User with ID ${userId} not found.`), null);
      }
    })
    .catch((error) => {
      return callback(error);
    });
  }
}
