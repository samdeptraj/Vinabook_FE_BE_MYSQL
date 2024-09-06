'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietSanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SanPham, DanhMucSanPham }) {
      // define association here
      this.belongsTo(SanPham, { foreignKey: "maSanPham" })
      this.belongsTo(DanhMucSanPham, { foreignKey: "maDanhMuc" })
    }
  }
  ChiTietSanPham.init({
    gioiThieuSach: DataTypes.STRING,
    tenNCC: DataTypes.STRING,
    tacGia: DataTypes.STRING,
    nguoiDich: DataTypes.STRING,
    nxb: DataTypes.STRING,
    namXb: DataTypes.STRING,
    trongLuong: DataTypes.STRING,
    kichThuocBaoBi: DataTypes.STRING,
    soTrang: DataTypes.STRING,
    hinhThuc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChiTietSanPham',
  });
  return ChiTietSanPham;
};