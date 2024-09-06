const express = require('express');
const { addSpGioHang, getSpGioHang, updateSpGioHang, deleteSpGioHang } = require('../controllers/giohang.controllers');
const { authenticate2 } = require('../middlewares/auth/authenticate2');

const gioHangRouter = express.Router();
gioHangRouter.post('/',addSpGioHang);
gioHangRouter.get('/',getSpGioHang);
gioHangRouter.put('/',updateSpGioHang);
gioHangRouter.delete('/:id',deleteSpGioHang);

module.exports = gioHangRouter;