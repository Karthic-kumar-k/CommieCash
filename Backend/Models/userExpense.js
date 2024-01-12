module.exports = (sequelize, DataTypes) =>{
  const UserExpense = sequelize.define('user_expense', {
    expenseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "expense",
        key: 'id'
      },
      unique: 'user_expense_unique_combination'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: 'id'
      },
      unique: 'user_expense_unique_combination'
    },
    amount : DataTypes.INTEGER,
  },
  {
    // Enforce a unique constraint on the combination of foreignKey1 and foreignKey2
    uniqueConstraints: [
      {
        name: 'user_expense_unique_combination',
        fields: ['userId', 'expenseId'],
      },
    ],
  });

  return UserExpense;
}
