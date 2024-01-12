const db = require('./Backend/Models');

(async () => {
    await db.sequelize.sync();
})();
