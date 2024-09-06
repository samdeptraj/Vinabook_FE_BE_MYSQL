'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChiTietSanPhams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gioiThieuSach: {
        type: Sequelize.STRING(999)
      },
      tenNCC: {
        type: Sequelize.STRING
      },
      tacGia: {
        type: Sequelize.STRING
      },
      nguoiDich: {
        type: Sequelize.STRING
      },
      nxb: {
        type: Sequelize.STRING
      },
      namXb: {
        type: Sequelize.STRING
      },
      trongLuong: {
        type: Sequelize.STRING
      },
      kichThuocBaoBi: {
        type: Sequelize.STRING
      },
      soTrang: {
        type: Sequelize.STRING
      },
      hinhThuc: {
        type: Sequelize.STRING
      },
      maSanPham: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sanphams",
          key: "id"
        }
      },
      maDanhMuc: {
        type: Sequelize.INTEGER,
        references: {
          model: "danhmucsanphams",
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
    await queryInterface.dropTable('ChiTietSanPhams');
  }
};