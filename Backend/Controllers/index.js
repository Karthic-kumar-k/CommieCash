const controllers = {}

controllers.group = require('./group');
controllers.user = require('./user');
controllers.expense = require('./expense');
controllers.userExpense = require('./userExpense')
controllers.groupUserMapping = require('./groupUserMapping')

module.exports = controllers;