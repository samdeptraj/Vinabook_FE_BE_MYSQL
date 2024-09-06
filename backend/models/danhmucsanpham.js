'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DanhMucSanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DanhMucSanPham.hasMany(models.ChiTietSanPham, { foreignKey: "maDanhMuc" })
    }
  }
  DanhMucSanPham.init({
    tenDanhMuc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DanhMucSanPham',
  });
  return DanhMucSanPham;
};