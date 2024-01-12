const { models : {Group}} = require ('../Models');

module.exports = {

  create : async(name, type, description, createdBy, modifiedBy, callback) =>{
    Group.create({
      name : name,
      type : type,
      description : description,
      createdBy : createdBy,
      createdAt : new Date(),
      modifiedBy : modifiedBy,
    })
    .then((createdInstance) =>{
      return callback(null, createdInstance.id)
    })
    .catch(async (err) =>{
      return callback(err)
    });
  },

  findOne : async(groupId, callback) => {
    var condition = { where: {  id : groupId } };

    Group.findOne(condition)
    .then(async (group) => {
        return callback(null, group);
    })
    .catch((err) => {
      return callback(err)
    });
  },

  delete : async(groupId, callback) => {
    Group.destroy({
      where: {
        id: groupId,
      },
      individualHooks: true, // Ensure that hooks are triggered for associations (e.g., beforeDestroy)
    })
    .then((numDeleted) => {
      if (numDeleted > 0) {
        return callback(null, `Group with ID ${groupId} and associated entries deleted successfully.`);
      }
      else {
        return callback(new Error(`Group with ID ${groupId} not found.`), null);
      }
    })
    .catch((error) => {
      return callback(error);
    });
  },

  // update : async (groupId, updatedData, callback) => {
  //   await Group.update(updatedData, {
  //     where: { id: groupId },
  //     returning: true // Return the updated rows
  //   })
  //   .then((_, _) => {
  //     // if (numRowsUpdated > 0) {
  //       return callback(null, `Group with ID ${rowId} updated successfully.`);
  //     // }
  //     // else {
  //     //   return callback(new Error(`Group with ID ${groupId} not found.`));
  //     // }
  //   })
  //   .catch((error) => {
  //     return callback(error);
  //   });
  // }

  update : async (groupId, updatedData, callback) => {
    try {
      const [numRowsUpdated, updatedRows] = await Group.update(updatedData, {
        where: { id: groupId },
        returning: true, // Return the updated rows
      });

      if (numRowsUpdated > 0) {
        return callback(null, `Group with ID ${rowId} updated successfully.`);
      } else {
        return callback(new Error(`Group with ID ${groupId} not found.`));
      }
    } catch (error) {
        callback(error);
    }
  }

}