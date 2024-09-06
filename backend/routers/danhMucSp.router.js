const express = require('express');
const { createDanhMucSP, updateDanhMuc, getAllDanhMuc, deleteDanhMuc, getAllSpDanhMuc, sapXepSpDanhMuc } = require('../controllers/danhMucSanPham.controllers');
const danhMucSanPhamRouter = express.Router();
danhMucSanPhamRouter.get('/', getAllDanhMuc);
danhMucSanPhamRouter.post('/', createDanhMucSP);
danhMucSanPhamRouter.put('/:id', updateDanhMuc);
danhMucSanPhamRouter.delete('/:id', deleteDanhMuc);
danhMucSanPhamRouter.get('/sap-xep-sp', sapXepSpDanhMuc);

module.exports = danhMucSanPhamRouter;