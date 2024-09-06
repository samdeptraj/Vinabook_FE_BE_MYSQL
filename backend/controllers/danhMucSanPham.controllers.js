const { where } = require('sequelize');
const { DanhMucSanPham, sequelize } = require('../models');

const getAllDanhMuc = async (req, res) => {
    const { tenDanhMuc } = req.query;
    try {
        if (tenDanhMuc) {
            try {
                const [result] = await sequelize.query(`
                    select sp.tenSp, sp.giaGoc,sp.giaSale,sp.image, ctsp.gioiThieuSach, ctsp.tacGia,dmsp.tenDanhMuc from danhmucsanphams as dmsp
                    inner join chitietsanphams as ctsp on ctsp.maDanhMuc = dmsp.id
                    inner join sanphams as sp on sp.id = ctsp.maSanPham
                    where dmsp.tenDanhMuc= "${tenDanhMuc}"
            `);
                res.status(200).send(result);
            } catch (error) {
                res.status(500).send(error);
            }
        } else {
            const listDanhMuc = await DanhMucSanPham.findAll();
            res.status(200).send(listDanhMuc);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
const createDanhMucSP = async (req, res) => {
    const { tenDanhMuc } = req.body;
    try {
        const danhMuc = await DanhMucSanPham.create({ tenDanhMuc });
        res.status(201).send({ message: "Thêm danh mục thành công!" });
    } catch (error) {
        res.status(500).send(error);
    }
}
const updateDanhMuc = async (req, res) => {
    const { id } = req.params;
    const { tenDanhMuc } = req.body;
    try {
        const danhMucUpdate = await DanhMucSanPham.findOne(
            { where: { id } }
        );
        danhMucUpdate.tenDanhMuc = tenDanhMuc;
        await danhMucUpdate.save();
        res.status(200).send("Cập nhập thành công!");
    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteDanhMuc = async (req, res) => {
    const { id } = req.params;
    try {
        await DanhMucSanPham.destroy(
            { where: { id } }
        );
        res.status(200).send({ message: "Xóa danh mục thành công!" });
    } catch (error) {
        res.status(500).send(error);
    }
}
const sapXepSpDanhMuc = async (req, res) => {
    let { loaisapxep, tendanhmuc } = req.headers;
    loaisapxep = decodeURIComponent(loaisapxep);
    tendanhmuc = decodeURIComponent(tendanhmuc);
    ('tendanhmuc: ', tendanhmuc);
    if (loaisapxep === "Mới nhất") {
        try {
            const [result] = await sequelize.query(
                `
                select sp.tenSp, sp.giaGoc,sp.giaSale,sp.image, dmsp.tenDanhMuc from danhmucsanphams as dmsp
                inner join chitietsanphams as ctsp on ctsp.maDanhMuc = dmsp.id
                inner join sanphams as sp on sp.id = ctsp.maSanPham
                where dmsp.tenDanhMuc = "${tendanhmuc}"
                order by sp.createdAt desc;
                `
            )
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    } else if (loaisapxep === "A đến Z") {
        try {
            const [result] = await sequelize.query(
                `
                    select sp.tenSp, sp.giaGoc,sp.giaSale,sp.image, dmsp.tenDanhMuc from danhmucsanphams as dmsp
                    inner join chitietsanphams as ctsp on ctsp.maDanhMuc = dmsp.id
                    inner join sanphams as sp on sp.id = ctsp.maSanPham
                    where dmsp.tenDanhMuc = "${tendanhmuc}"
                    order by sp.tenSp asc
                `
            )
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    } else if (loaisapxep === "Z đến A") {
        try {
            const [result] = await sequelize.query(
                `
                    select sp.tenSp, sp.giaGoc,sp.giaSale,sp.image, dmsp.tenDanhMuc from danhmucsanphams as dmsp
                    inner join chitietsanphams as ctsp on ctsp.maDanhMuc = dmsp.id
                    inner join sanphams as sp on sp.id = ctsp.maSanPham
                    where dmsp.tenDanhMuc = "${tendanhmuc}"
                    order by sp.tenSp desc
                `
            )
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    } else if (loaisapxep === "Giá thấp đến cao") {
        try {
            const [result] = await sequelize.query(
                `
                select sp.tenSp, sp.giaGoc,sp.giaSale,sp.image, dmsp.tenDanhMuc from danhmucsanphams as dmsp
                inner join chitietsanphams as ctsp on ctsp.maDanhMuc = dmsp.id
                inner join sanphams as sp on sp.id = ctsp.maSanPham
                where dmsp.tenDanhMuc = "${tendanhmuc}"
                order by 
                    cast(
                        case
                        when sp.giaSale is not null then sp.giaSale
                        else sp.giaGoc
                    end as decimal(10,2)
                    ) asc;
                `
            )
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    } else if (loaisapxep === "Giá cao đến thấp") {
        try {
            const [result] = await sequelize.query(
                `
                select sp.tenSp, sp.giaGoc,sp.giaSale,sp.image, dmsp.tenDanhMuc from danhmucsanphams as dmsp
                inner join chitietsanphams as ctsp on ctsp.maDanhMuc = dmsp.id
                inner join sanphams as sp on sp.id = ctsp.maSanPham
                where dmsp.tenDanhMuc = "${tendanhmuc}"
                order by 
                    cast(
                        case
                        when sp.giaSale is not null then sp.giaSale
                        else sp.giaGoc
                    end as decimal(10,2)
                    ) desc;
                `
            )
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    } else if (loaisapxep === "Giảm giá thấp đến cao") {
        try {
            const [result] = await sequelize.query(
                `
                select sp.tenSp, sp.giaGoc,sp.giaSale,sp.image, dmsp.tenDanhMuc, round((((sp.giaGoc-sp.giaSale)/sp.giaGoc)*100),0) as giamGia  from danhmucsanphams as dmsp
                inner join chitietsanphams as ctsp on ctsp.maDanhMuc = dmsp.id
                inner join sanphams as sp on sp.id = ctsp.maSanPham
                where dmsp.tenDanhMuc = "${tendanhmuc}"
                order by giamGia asc;
                `
            )
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    } else if (loaisapxep === "Giảm giá cao đến thấp") {
        try {
            const [result] = await sequelize.query(
                `
                select sp.tenSp, sp.giaGoc,sp.giaSale,sp.image, dmsp.tenDanhMuc, round((((sp.giaGoc-sp.giaSale)/sp.giaGoc)*100),0) as giamGia  from danhmucsanphams as dmsp
                inner join chitietsanphams as ctsp on ctsp.maDanhMuc = dmsp.id
                inner join sanphams as sp on sp.id = ctsp.maSanPham
                where dmsp.tenDanhMuc = "${tendanhmuc}"
                order by giamGia desc;
                `
            )
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    }

}
module.exports = {
    getAllDanhMuc,
    createDanhMucSP,
    updateDanhMuc,
    deleteDanhMuc,
    sapXepSpDanhMuc
}