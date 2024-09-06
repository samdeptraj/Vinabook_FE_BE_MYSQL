const { where } = require("sequelize");
const { HoaDonDatHang, NguoiDung } = require("../models");
const createBill = async (req, res) => {
    ('req.body: ', req.body);
    const { sdt, diaChi, tinhThanh, quanHuyen, phuongXa, maNguoiDung, maSanPhams } = req.body;
    try {
        for (maSp of maSanPhams) {
            await HoaDonDatHang.create({ sdt, diaChi, tinhThanh, quanHuyen, phuongXa, maNguoiDung, maSanPham: maSp });
        }
        res.status(201).send("Ok");
    } catch (error) {
        res.status(500).send(error);
    }
}
const getAllBill = async (req, res) => {
    try {
        const BillList = await HoaDonDatHang.findAll();
        res.status(200).send(BillList);
    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteBill = async (req, res) => {
    const { id } = req.body;
    try {
        const bill = await HoaDonDatHang.destroy({
            where: {
                id
            }
        })
        res.status(200).send("Da huy hoa don id: " + id);
    } catch (error) {
        res.status(500).send(error);

    }
}
const updateBill = async (req, res) => {
    const { id } = req.body;
    const { sdt, diaChi, quocGia, tinhThanh, quanHuyen, phuongXa, htvc, httt, phiVanChuyen, maNguoiDung } = req.body;
    try {
        await HoaDonDatHang.update({ sdt, diaChi, quocGia, tinhThanh, quanHuyen, phuongXa, htvc, httt, phiVanChuyen, maNguoiDung },
            {
                where: {
                    id
                }
            })
        res.status(200).send("Da update hoa don id: " + id);
    } catch (error) {
        res.status(500).send(error);

    }
}
module.exports = {
    createBill,
    getAllBill,
    deleteBill,
    updateBill
}