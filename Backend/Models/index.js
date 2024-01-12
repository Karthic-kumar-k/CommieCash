const configs = require('../../db-configs')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(configs.DATABASE, configs.USER, configs.PASSWORD, {
    host : configs.HOST,
    dialect : configs.DIAELECT,
    port : configs.PORT,
    quoteIdentifier : true
  });

// const testDbConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// module.exports = testDbConnection

const db = {}

db.sequelize = sequelize;

db.models = {}

db.models.Group = require('./group')(sequelize, Sequelize.DataTypes);
db.models.Expense = require('./expense')(sequelize, Sequelize.DataTypes);
db.models.User = require('./user')(sequelize, Sequelize.DataTypes);
db.models.UserExpense = require('./userExpense')(sequelize, Sequelize.DataTypes);
db.models.GroupUserMapping = require('./groupUserMapping')(sequelize)

// Define the many-to-many relationship
db.models.User.belongsToMany(db.models.Group, { through: db.models.GroupUserMapping });
db.models.Group.belongsToMany(db.models.User, { through: db.models.GroupUserMapping });

module.exports = db;
