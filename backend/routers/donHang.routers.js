const express = require('express');
const { addSpGioHang, getSpGioHang, updateSpGioHang, deleteSpGioHang } = require('../controllers/giohang.controllers');
const { addDonHang, getDonHangCuaToi, getAllDonHang, updateDonHang, deleteDonHang } = require('../controllers/donHang.controllers');

const donHangRouter = express.Router();
donHangRouter.post('/', addDonHang);
donHangRouter.get('/', getAllDonHang);
donHangRouter.get('/don-hang-cua-toi', getDonHangCuaToi);
donHangRouter.put('/:id', updateDonHang);
donHangRouter.delete('/:id', deleteDonHang);

module.exports = donHangRouter;