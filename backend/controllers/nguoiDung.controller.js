const bcrypt = require('bcryptjs');
const { NguoiDung, sequelize } = require('../models');
const { where } = require('sequelize');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
    const { ho, ten, email, password } = req.body;
    try {
        // tao 1 chuoi ngau nhien 
        const salt = bcrypt.genSaltSync(10);
        // ma hoa chuoi salt + password
        const hashPassword = bcrypt.hashSync(password, salt);
        // gravatar
        const gravatarUrl = await import('gravatar-url');

        const avatarUrl = gravatarUrl.default(email, { size: 200 });
        const newNguoiDung = await NguoiDung.create({ ho, ten, email, password: hashPassword, avatar: avatarUrl });
        res.status(201).send({ message: "Đăng ký thành công!" });
    } catch (error) {
        res.status(500).send(error);
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    // b1: tim ra user dang dangw nhap dua tren email (kiem tra user co ton tai hay kh qua email)
    try {
        const user = await NguoiDung.findOne({
            where: {
                email
            }
        })
        if (user) {
            const isAuth = bcrypt.compareSync(password, user.password)
            if (isAuth) {
                const token = jwt.sign({ maNguoiDung: user.id, email: user.email, quyenHan: user.quyenHan }, "admin2003")
                res.status(200).send({ message: 'Đăng nhập thành công!', token },);
            } else {
                res.status(404).send({ message: 'Tài khoản hoặc mật khẩu không chính xác!' });
            }
        } else {
            res.status(404).send({ message: 'Tai khoan khong ton tai' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
const getAllUser = async (req, res) => {
    try {
        const ListUser = await NguoiDung.findAll();
        res.status(200).send(ListUser)
    } catch (error) {
        res.status(500).send(error);
    }
}
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await NguoiDung.findOne({
            where: { id }
        });
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error);
    }
}
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { ho, ten, email, quyenHan } = req.body;

    try {
        const user = await NguoiDung.findOne({
            where: { id }
        });

        if (user) {
            const updatedFields = {};
            const salt = bcrypt.genSaltSync(10);

            if (ho !== null && ho !== undefined) {
                updatedFields.ho = ho;
            }
            if (ten !== null && ten !== undefined) {
                updatedFields.ten = ten;
            }
            if (email !== null && email !== undefined) {
                updatedFields.email = email;
            }
            // if (password !== null && password !== undefined) {
            //     const hashNewPassword = bcrypt.hashSync(password, salt);
            //     updatedFields.password = hashNewPassword;
            // }
            if (quyenHan !== null && quyenHan !== undefined) {
                updatedFields.quyenHan = quyenHan;
            }
            await user.update(updatedFields);
            res.status(200).send({ message: "Cập nhật thành công! " });
        } else {
            res.status(404).send({ message: "Không tìm thấy người dùng với ID đã cung cấp." });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const findUser = await NguoiDung.findOne({
            where: { id }
        })
        if (findUser) {
            await sequelize.query(`
                delete from giohangs where maNguoiDung=${id}
            `)
            const [result] = await sequelize.query(`
            select hddh.id from hoadondathangs as hddh
            inner join nguoidungs as nd on hddh.maNguoiDung=nd.id
            where nd.id=${id};
            `)
            for (const item of result) {
                await sequelize.query(`
                    delete from donhangs where maHoaDon=${item.id}
                `)
            }
            await sequelize.query(`
                delete from hoadondathangs where maNguoiDung=${id}
            `)
            await findUser.destroy({
                where: { id }
            });
            res.status(200).send({ message: "Xóa người dùng thành công! " });
        } else {
            res.status(404).send({ message: "Người dùng không tồn tại!" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
const uploadAvatar = async (req, res) => {
    const { user, file } = req;
    const urlImage = `${DOMAIN}/${file.path}`;
    const userFind = await NguoiDung.findOne({
        where: {
            email: user.email
        },
    })
    userFind.avatar = urlImage;
    await userFind.save();
    res.send(urlImage);

}
// jwt
module.exports = {
    register,
    login,
    uploadAvatar,
    getAllUser,
    updateUser,
    deleteUser,
    getUserById
}
// ma hoa bcryptjs