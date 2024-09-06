'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GioHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SanPham,NguoiDung }) {
      // define association here
      this.belongsTo(SanPham, { foreignKey: "maSanPham" });
      this.belongsTo(NguoiDung, { foreignKey: "maNguoiDung" });
    }
  }
  GioHang.init({
    soLuongSpGioHang: DataTypes.INTEGER
  }
  , {
    sequelize,
    modelName: 'GioHang',
  });
  return GioHang;
};