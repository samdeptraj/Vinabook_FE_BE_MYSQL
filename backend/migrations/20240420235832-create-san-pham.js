'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SanPhams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenSp: {
        type: Sequelize.STRING(255)
      },
      giaGoc: {
        type: Sequelize.STRING
      },
      giaSale: {
        type: Sequelize.STRING
      },
      soLuong: {
        type: Sequelize.STRING,
        defaultValue: 1
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SanPhams');
  }
};