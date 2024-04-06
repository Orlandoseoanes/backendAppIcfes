const { Sequelize } = require("sequelize");

const dotenv=require("dotenv");
dotenv.config();
// Set up dotenv with .env file
console.log(process.env.DB_DATABASE);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_HOST);

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection(); // Llamamos a la función para probar la conexión

module.exports = sequelize;
