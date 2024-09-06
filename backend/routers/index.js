const express = require('express');
const { sanPhamRouter } = require('./sanPham.routers');
const { userRouter } = require('./nguoiDung.router');
const { hoaDonDatHangRouter } = require('./hoaDonDatHang.routers');
const chiTietSanPhamRouter = require('./chiTietSanPham.router');
const danhMucSanPhamRouter = require('./danhMucSp.router');
const gioHangRouter = require('./gioHang.routers');
const donHangRouter = require('./donHang.routers');

const rootRouter = express.Router();
rootRouter.use('/san-pham', sanPhamRouter);
rootRouter.use('/nguoi-dung', userRouter);
rootRouter.use('/hoa-don-dat-hang', hoaDonDatHangRouter);
rootRouter.use('/chi-tiet-san-pham', chiTietSanPhamRouter);
rootRouter.use('/danh-muc-san-pham', danhMucSanPhamRouter);
rootRouter.use('/gio-hang', gioHangRouter);
rootRouter.use('/don-hang', donHangRouter);

module.exports = {
    rootRouter
}