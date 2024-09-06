'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HoaDonDatHangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sdt: {
        type: Sequelize.STRING
      },
      diaChi: {
        type: Sequelize.STRING
      },
      quocGia: {
        type: Sequelize.STRING,
        defaultValue: "Việt Nam"
      },
      tinhThanh: {
        type: Sequelize.STRING
      },
      quanHuyen: {
        type: Sequelize.STRING
      },
      phuongXa: {
        type: Sequelize.STRING
      },
      htvc: {
        type: Sequelize.STRING,
        defaultValue: "Giao hàng tận nơi"
      },
      httt: {
        type: Sequelize.STRING,
        defaultValue: "Thanh toán khi giao hàng"
      },
      phiVanChuyen: {
        type: Sequelize.STRING,
        defaultValue: "Miễn phí"
      },
      maNguoiDung: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nguoidungs',
          key: "id"
        }
      },
      maSanPham: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sanphams",
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
    await queryInterface.dropTable('HoaDonDatHangs');
  }
};