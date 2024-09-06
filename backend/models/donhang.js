'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ HoaDonDatHang }) {
      // define association here
      this.belongsTo(HoaDonDatHang, { foreignKey: "maHoaDon" });
    }
  }
  DonHang.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DonHang',
  });
  return DonHang;
};