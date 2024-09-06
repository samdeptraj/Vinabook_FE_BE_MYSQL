'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HoaDonDatHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ NguoiDung, SanPham, DonHang }) {
      // define association here
      this.belongsTo(NguoiDung, { foreignKey: "maNguoiDung" });
      this.belongsTo(SanPham, { foreignKey: "maSanPham" });
      HoaDonDatHang.hasMany(DonHang, { foreignKey: "maHoaDon" })
    }
  }
  HoaDonDatHang.init({
    sdt: DataTypes.STRING,
    diaChi: DataTypes.STRING,
    quocGia: DataTypes.STRING,
    tinhThanh: {
      type: DataTypes.STRING,
    },
    quanHuyen: DataTypes.STRING,
    phuongXa: DataTypes.STRING,
    htvc: DataTypes.STRING,
    httt: DataTypes.STRING,
    phiVanChuyen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HoaDonDatHang',
  });
  return HoaDonDatHang;
};