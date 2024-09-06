const express = require('express');
const { createChiTietSP, getAllChiTietSP, updateChiTietSP, deleteChiTietSP, getChiTietSPUser } = require('../controllers/chiTietSanPham.controllers');
const chiTietSanPhamRouter = express.Router();
chiTietSanPhamRouter.get('/', getAllChiTietSP);
chiTietSanPhamRouter.post('/', createChiTietSP);
chiTietSanPhamRouter.put('/:id', updateChiTietSP);
chiTietSanPhamRouter.delete('/:id', deleteChiTietSP);
module.exports = chiTietSanPhamRouter;