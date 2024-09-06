const { where } = require('sequelize');
const { GioHang, sequelize } = require('../models');
const addSpGioHang = async (req, res) => {
    const { maSanPham, maNguoiDung } = req.body;
    try {
        const checkSpExist = await GioHang.findOne({
            where: {
                maSanPham,
                maNguoiDung
            }
        })
        if (checkSpExist) {
            await GioHang.update({
                soLuongSpGioHang: checkSpExist.soLuongSpGioHang + 1
            },
                {
                    where: {
                        maSanPham,
                        maNguoiDung
                    }
                })
            res.status(200).send("Them san pham thanh cong");
        } else {
            const cart = await GioHang.create({ maSanPham, maNguoiDung });
            res.status(201).send(cart);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
const getSpGioHang = async (req, res) => {
    const { manguoidung } = req.headers;
    ('maNguoiDung: ', manguoidung);
    try {
        const [result] = await sequelize.query(`
            select sp.*, nd.id as maNguoiDung, gh.* from giohangs as gh 
            inner join sanphams as sp on sp.id = gh.maSanPham
            inner join nguoidungs as nd on nd.id = gh.maNguoiDung 
            where nd.id = ${manguoidung} 
        `)
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}
const updateSpGioHang = async (req, res) => {
    const { maSanPham, maNguoiDung, type } = req.body;

    try {
        const checkExists = await GioHang.findOne({
            where: { maSanPham, maNguoiDung }
        })
        if (checkExists) {
            const spUpdate = await GioHang.update({ soLuongSpGioHang: type ? checkExists.soLuongSpGioHang + 1 : checkExists.soLuongSpGioHang <= 0 ? checkExists.soLuongSpGioHang = 0 : checkExists.soLuongSpGioHang - 1 }, { where: { maSanPham, maNguoiDung } })
            res.status(200).send(spUpdate);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteSpGioHang = async (req, res) => {
    const { id } = req.params;
    try {
        const checkExists = await GioHang.findOne({
            where: { id }
        })
        if (checkExists) {
            const spDelete = await GioHang.destroy({
                where: {
                    id
                }
            })
            res.status(200).send("Xoa ok ne~");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    addSpGioHang,
    getSpGioHang,
    updateSpGioHang,
    deleteSpGioHang
}