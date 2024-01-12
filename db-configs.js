require("dotenv").config()

module.exports = {
    HOST : process.env.DB_HOST ,
    USER : process.env.DB_USER,
    PASSWORD : process.env.DB_PASSWORD,
    DATABASE : process.env.MYSQL_DATABASE,
    DIAELECT : process.env.MYSQL_DIAELECT,
    PORT : process.env.DB_PORT
}