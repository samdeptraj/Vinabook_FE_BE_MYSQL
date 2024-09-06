const { where } = require('sequelize');
const { DonHang, sequelize } = require('../models');
const addDonHang = async (req, res) => {
    try {
        ('req.body: ', req.body);
        for (let maHD of req.body) {
            const madonCheckExist = await DonHang.findOne({
                where: { maHoaDon: maHD }
            })
            if (!madonCheckExist) {
                await DonHang.create({ maHoaDon: maHD })
            }
        }
        res.status(200).send("OK tao hoa don thanh cong");

    } catch (error) {
        // Trả về lỗi nếu có bất kỳ lỗi nào xảy ra
        res.status(500).send(error);
    }
}

const getAllDonHang = async (req, res) => {
    try {
        const [result] = await sequelize.query(`
            SELECT sp.* , hddh.*, dh.*, email
            FROM donhangs AS dh
            INNER JOIN hoadondathangs AS hddh ON dh.maHoaDon = hddh.id
            INNER JOIN sanphams AS sp ON sp.id = hddh.maSanPham
            INNER JOIN nguoidungs AS nd ON nd.id = hddh.maNguoiDung
        `);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}
const getDonHangCuaToi = async (req, res) => {
    const { manguoidung } = req.headers;
    ('manguoidung: ', manguoidung);
    try {
        const [result] = await sequelize.query(`
            SELECT sp.* , hddh.*, dh.*
            FROM donhangs AS dh
            INNER JOIN hoadondathangs AS hddh ON dh.maHoaDon = hddh.id
            INNER JOIN sanphams AS sp ON sp.id = hddh.maSanPham
            where hddh.maNguoiDung = ${manguoidung}
        `);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}
const updateDonHang = async (req, res) => {
    (' req.body: ', req.body);
    const { id, status } = req.body;
    try {
        await DonHang.update({ status }, {
            where: { id }
        })
        res.status(200).send({ message: "Cập nhập thành công!" });

    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteDonHang = async (req, res) => {
    const { id } = req.params;
    try {
        await DonHang.destroy({
            where: { id }
        })
        res.status(200).send({ message: "Xóa thành công!" });
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    addDonHang,
    getDonHangCuaToi,
    updateDonHang,
    deleteDonHang,
    getAllDonHang
}