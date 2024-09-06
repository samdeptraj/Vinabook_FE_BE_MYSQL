const express = require('express');
const { register, login, uploadAvatar, getAllUser, updateUser, deleteUser, getUserById } = require('../controllers/nguoiDung.controller');
const uploadImage = require('../middlewares/upload/uploadImage');
const { authenticate } = require('../middlewares/auth/authenticate');
const { NguoiDung } = require('../models');
const CheckExists = require('../middlewares/check/CheckExists');
const userRouter = express.Router();
userRouter.post('/register', CheckExists(NguoiDung), register);
userRouter.post('/login', login);
userRouter.get('/', getAllUser);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);
userRouter.post('/upload-avatar', authenticate, uploadImage("avatars"), uploadAvatar)
module.exports = {
    userRouter
}