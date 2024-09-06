// req la phia nguoi dung gui len
// res la phia server tra ve
// goi ra table
const { where, Op } = require('sequelize');
const { SanPham, sequelize } = require('../models');
const { DOMAIN } = require('../util/constain/constain');
const createSanPham = async (req, res) => {
    let { tenSp, giaGoc, giaSale } = req.body;
    tenSp = tenSp.trim();
    giaGoc = giaGoc.trim();
    giaSale = giaSale.trim();
    const { file } = req;
    try {
        const urlImage = `${DOMAIN}/${file.path}`;
        const newSanPham = await SanPham.create({ tenSp, giaGoc, giaSale, image: urlImage });
        res.status(201).send({ data: newSanPham, message: "Thêm sản phẩm thành công!" });
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const getAllSanPham = async (req, res) => {
    try {
        const sanPhamList = await SanPham.findAll();
        res.status(200).send(sanPhamList);
    } catch (error) {
        res.status(500).send("Loi roi anh");
    }
}
// user get
const getAllSanPhamUser = async (req, res) => {
    const { tenSp } = req.query;
    try {
        if (tenSp) {
            const sanPhamList = await SanPham.findAll({
                where: {
                    tenSp: {
                        [Op.like]: `%${tenSp}%`
                    }
                }
            });
            res.status(200).send(sanPhamList);
        } else {
            const [result] = await sequelize.query(
                `
            select * from sanphams as sp
            inner join chitietsanphams as ctsp on ctsp.maSanPham = sp.id
            inner join danhmucsanphams as dmsp on dmsp.id = ctsp.maDanhMuc
                `
            );
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send("Loi roi anh");
    }
}
const getSanPhamDetail = async (req, res) => {
    try {
        const { id } = req.body;
        const sanPhamDetail = await SanPham.findOne({
            where: {
                id
            }
        })
        res.status(200).send(sanPhamDetail);

    } catch (error) {
        res.status(500).send("Loi roi anh");
    }
}
const getSanPhamYetDetail = async (req, res) => {
    try {
        const [result] = await sequelize.query(
            `
                SELECT sp.*
                FROM sanphams AS sp
                LEFT JOIN chitietsanphams AS ctsp ON ctsp.maSanPham = sp.id
                WHERE ctsp.maSanPham IS NULL
            `
        );
        res.status(200).send(result);

    } catch (error) {
        res.status(500).send("Loi roi anh");
    }
}
const updateSanPham = async (req, res) => {
    const { id } = req.params;
    const { file } = req;
    const { tenSp, giaGoc, giaSale, soLuong } = req.body;
    try {
        const urlImage = `${DOMAIN}/${file.path}`;
        const sanPhamDetail = await SanPham.findOne({
            where: {
                id
            }
        })
        sanPhamDetail.tenSp = tenSp;
        sanPhamDetail.giaGoc = giaGoc;
        sanPhamDetail.giaSale = giaSale;
        sanPhamDetail.soLuong = soLuong;
        sanPhamDetail.image = urlImage;
        await sanPhamDetail.save();
        res.status(200).send({ message: "Cập nhập sản phẩm thành công!" });
    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteSanPham = async (req, res) => {
    const { id } = req.params;
    try {
        await sequelize.query(`
            DELETE ctsp
            FROM chitietsanphams AS ctsp
            INNER JOIN sanphams AS sp ON sp.id = ctsp.maSanPham
            WHERE sp.id = ${id};
        `)
        await sequelize.query(`
            delete sp
            from sanphams as sp
            where sp.id=${id};
    `)
        res.status(200).send({ message: "Xóa thành công!" });
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    createSanPham,
    getAllSanPham,
    getSanPhamDetail,
    updateSanPham,
    deleteSanPham,
    getAllSanPhamUser,
    getSanPhamYetDetail
}

