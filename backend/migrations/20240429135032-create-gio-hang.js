'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GioHangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      soLuongSpGioHang: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      maSanPham: {
        type: Sequelize.INTEGER,
        references: {
          model: "sanphams",
          key: "id"
        }
      },
      maNguoiDung: {
        type: Sequelize.INTEGER,
        references: {
          model: "nguoidungs",
          key: "id"
        }
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
    await queryInterface.dropTable('GioHangs');
  }
};