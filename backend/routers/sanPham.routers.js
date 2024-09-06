// tuong tac voi api
const express = require('express');
const uploadImage = require('../middlewares/upload/uploadImage');
const { createSanPham, getAllSanPham, getSanPhamDetail, updateSanPham, deleteSanPham, uploadAvatar, uploadImageSanPham, getAllSanPhamUser, getSanPhamYetDetail } = require('../controllers/sanPham.controllers');
const { checkExist, CheckSanPhamExists } = require('../middlewares/check/checkExist');
const { SanPham } = require('../models');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');

const sanPhamRouter = express.Router();
sanPhamRouter.post('/', authenticate, uploadImage('sanPhams'), CheckSanPhamExists(SanPham), createSanPham);
sanPhamRouter.get('/', getAllSanPham);
sanPhamRouter.get('/user', getAllSanPhamUser);
sanPhamRouter.get('/yet-detail', getSanPhamYetDetail);
sanPhamRouter.get('/:id', getSanPhamDetail);
sanPhamRouter.put('/:id', checkExist(SanPham), uploadImage('sanPhams'), updateSanPham);
sanPhamRouter.delete('/:id', authenticate, authorize, checkExist(SanPham), deleteSanPham);

module.exports = {
    sanPhamRouter
}
