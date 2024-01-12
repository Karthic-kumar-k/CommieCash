const { models : { User, Group, GroupUserMapping} } = require('../Models'); // Adjust the path accordingly

const create = async (userId, groupId, callback) =>{
  const user = await User.findByPk(userId);
  if (!user)
    return callback(new Error(`User with id ${userId} not found`));

  const group = await Group.findByPk(groupId);
  if (!group)
    return callback(new Error(`Group with id ${groupId} not found`));

  GroupUserMapping.create({ userId, groupId })
  .then((createdInstance) =>{
    return callback(null, createdInstance.id)
  })
  .catch(async (err) =>{
    return callback(err)
  });
}

const getUsersInGroup = async (groupId, callback) => {
  try {
    const group = await Group.findByPk(groupId, {
      include: [{ model: User, through: GroupUserMapping }],
    });

    if (!group) {
      throw new Error(`Group with id ${groupId} not found`);
    }
    return callback(null, group.users);
  } catch (error) {
    // Handle error
    console.error("Error fetching users in group:", error);
    return callback(error);
  }
};

const getGroupsForUser = async (userId, callback) => {
  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Group, through: GroupUserMapping }],
    });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    return callback(null, user.groups);
  } catch (error) {
    // Handle error
    console.error("Error fetching groups for user:", error);
    return callback(error);
  }
};

const removeUserFromGroup = async (userId, groupId, callback) => {
  try {
    // Remove user from group using the GroupUserMapping model
    await GroupUserMapping.destroy({
      where: { userId, groupId },
    })
    .then((numDeleted) => {
      if (numDeleted > 0) {
        return callback(null, `User ${userId} got deleted from group ${groupId} successfully.`);
      }
      else {
        return callback(new Error(`User ${userId} / Group ${groupId} not found.`), null);
      }
    })
    .catch((error) => {
      return callback(error);
    });
  } catch (error) {
    // Handle error
    console.error("Error removing user from group:", error);
    return callback(error);
  }
};

module.exports = {
  create,
  getUsersInGroup,
  getGroupsForUser,
  removeUserFromGroup,
};
