const express = require('express');
const app = express();
const _ = require('./db-initializer');

require("dotenv").config()

app.use(express.json());

//Route Files
require('./Backend/Routes/serverCheck')(app);
require('./Backend/Routes/group')(app);
require('./Backend/Routes/user')(app);

const appPort = process.env.APP_PORT;

app.listen(appPort, () => {
  console.log(`app started in ${appPort}`);
});
