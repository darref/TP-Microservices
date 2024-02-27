const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('MicroserviceTP', 'jordan.ferrad', 'QCxM9NHkpED1', {
  host: 'ep-wandering-frost-a2a7vbu0.eu-central-1.aws.neon.tech',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Vous pouvez ajuster cette option en fonction de vos besoins de sécurité
    }
  }
});

module.exports = sequelize;
