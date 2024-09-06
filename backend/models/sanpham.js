'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SanPham.hasMany(models.HoaDonDatHang, { foreignKey: "maSanPham" });
      SanPham.hasOne(models.ChiTietSanPham, { foreignKey: "maSanPham" });
      SanPham.hasOne(models.GioHang, {foreignKey: "maSanPham"})
    }
  }
  SanPham.init({
    tenSp: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    giaGoc: {
      type: DataTypes.STRING,
      validate: {
        checkLen(value) {
          if (value.length >= 1 && value.length <= 10 && Number(value)) {
            return true;
          }
          throw new Error('Yeu cau nhap so hop le!')
        }
      }
    },
    giaSale: DataTypes.STRING,
    soLuong: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SanPham',
  });
  return SanPham;
};