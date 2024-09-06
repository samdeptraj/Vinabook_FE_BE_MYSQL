const express = require('express');
const { createBill, getAllBill, deleteBill, updateBill } = require('../controllers/hoaDonDatHang.controllers');

const hoaDonDatHangRouter = express.Router();
hoaDonDatHangRouter.post('/', createBill);
hoaDonDatHangRouter.get('/', getAllBill);
hoaDonDatHangRouter.put('/:id', updateBill);
hoaDonDatHangRouter.delete('/:id', deleteBill);

module.exports = {
    hoaDonDatHangRouter
}