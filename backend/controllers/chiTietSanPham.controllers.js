const { where } = require('sequelize');
const { ChiTietSanPham, sequelize } = require('../models');
const createChiTietSP = async (req, res) => {
    const { gioiThieuSach,
        tenNCC,
        tacGia,
        nguoiDich,
        nxb,
        namXb,
        trongLuong,
        kichThuocBaoBi,
        soTrang,
        hinhThuc,
        maSanPham,
        maDanhMuc } = req.body;
    try {
        await ChiTietSanPham.create({
            gioiThieuSach,
            tenNCC,
            tacGia,
            nguoiDich,
            nxb,
            namXb,
            trongLuong,
            kichThuocBaoBi,
            soTrang,
            hinhThuc,
            maSanPham,
            maDanhMuc
        })
        res.status(201).send({ message: "Thêm thành công! " });
    } catch (error) {
        res.status(500).send(error);
    }
}
const getAllChiTietSP = async (req, res) => {
    try {
        let { tenSp } = req.query;
        if (tenSp) {
            try {
                const [result] = await sequelize.query(
                    `
                select sp.*,dmsp.*, ctsp.* from sanphams as sp
                inner join chitietsanphams as ctsp on ctsp.maSanPham = sp.id
                inner join danhmucsanphams as dmsp on dmsp.id = ctsp.maDanhMuc
                where sp.tenSp = "${tenSp}"
                    `
                );
                res.status(200).send(...result);
                ('result: ', result);
            } catch (error) {
                res.status(500).send(error);
            }
        }
        else {
            const [result] = await sequelize.query(
                `
            select ctsp.*, sp.tenSp as tenSp ,dmsp.tenDanhMuc as tenDanhMuc from sanphams as sp
            inner join chitietsanphams as ctsp on ctsp.maSanPham = sp.id
            inner join danhmucsanphams as dmsp on dmsp.id = ctsp.maDanhMuc
            order by ctsp.id asc
            `
            );
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
const updateChiTietSP = async (req, res) => {
    const { id } = req.params;
    const {
        gioiThieuSach,
        tenNCC,
        tacGia,
        nguoiDich,
        nxb,
        namXb,
        trongLuong,
        kichThuocBaoBi,
        soTrang,
        hinhThuc,
        maSanPham,
        maDanhMuc
    } = req.body;
    try {
        const chiTietUpdate = await ChiTietSanPham.findOne(
            { where: { id } }
        );
        chiTietUpdate.gioiThieuSach = gioiThieuSach;
        chiTietUpdate.tenNCC = tenNCC;
        chiTietUpdate.tacGia = tacGia;
        chiTietUpdate.nguoiDich = nguoiDich;
        chiTietUpdate.nxb = nxb;
        chiTietUpdate.namXb = namXb;
        chiTietUpdate.trongLuong = trongLuong;
        chiTietUpdate.kichThuocBaoBi = kichThuocBaoBi;
        chiTietUpdate.soTrang = soTrang;
        chiTietUpdate.hinhThuc = hinhThuc;
        chiTietUpdate.maSanPham = maSanPham;
        chiTietUpdate.maDanhMuc = maDanhMuc;
        await chiTietUpdate.save();
        res.status(200).send({ message: "Cập nhập thành công! " });
    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteChiTietSP = async (req, res) => {
    const { id } = req.params;
    try {
        await DanhMucSanPham.destroy(
            { where: { id } }
        );
        res.status(200).send("Xóa danh mục thành công!");
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    createChiTietSP,
    getAllChiTietSP,
    updateChiTietSP,
    deleteChiTietSP,
}