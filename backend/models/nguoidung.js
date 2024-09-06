'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NguoiDung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NguoiDung.hasMany(models.HoaDonDatHang, { foreignKey: "maNguoiDung" });
      NguoiDung.hasOne(models.GioHang, {foreignKey: "maNguoiDung"});
    }
  }
  NguoiDung.init({
    ho: DataTypes.STRING,
    ten: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    quyenHan: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NguoiDung',
  });
  return NguoiDung;
};
