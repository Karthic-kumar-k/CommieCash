const { models : {Expense, Group}} = require ('../Models');

module.exports = {

  create : async(expenseName, groupId, totalAmount, desc, createdBy, modifiedBy, callback) =>{
    // const group = await Group.findByPk(groupId);
    Expense.create({
      name : expenseName,
      groupId: groupId,
      amount : totalAmount,
      description : desc,
      createdBy : createdBy,
      createdAt : new Date(),
      modifiedBy : modifiedBy
    })
    .then(() =>{
      return callback(null, "Success")
    })
    .catch((err) =>{
      return callback(err)
    });
  },

  findOne : async(expenseId, callback) => {
    var condition = { where: {  id : expenseId } };

    Expense.findOne(condition)
    .then(async (expense) => {
        return callback(null, expense);
    })
    .catch((err) => {
      return callback(err)
    });
  }
}