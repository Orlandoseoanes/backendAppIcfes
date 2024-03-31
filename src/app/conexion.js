const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('preicfes', 'prueba', 'tMeque+2023+', {
    host: 'srv435312.hstgr.cloud',
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
