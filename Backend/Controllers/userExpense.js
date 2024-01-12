const { models : {UserExpense}} = require ('../Models');

module.exports = {

  create : async(userId, expenseId, amount, callback) =>{
    UserExpense.create({
      amount : amount,
      expenseId : expenseId,
      userId : userId
    })
    .then(() =>{
      return callback(null, "Success")
    })
    .catch((err) =>{
      return callback(err)
    });
  },

  findOne : async(userId, expenseId, callback) => {
    var condition =
      {
        where: {
          and : {
            userId : userId,
            expenseId : expenseId
          }
        }
      };

    UserExpense.findOne(condition)
    .then(async (userExpense) => {
        return callback(null, userExpense);
    })
    .catch((err) => {
      return callback(err)
    });
  }
}