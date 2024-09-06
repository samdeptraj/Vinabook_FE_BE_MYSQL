const checkExist = (model) => {
    return async (req, res, next) => {
        const { id } = req.params;
        try {
            // kiem tra xem san pham do co ton tai hay khong truoc khi delete
            const sanPham = await model.findOne({
                where: {
                    id
                }
            })
            if (sanPham) {
                next();
            } else {
                res.status(404).send('Khong tim thay san pham co id: ' + id);
            }
        } catch (error) {

        }
    }
}
// create sp
const CheckSanPhamExists = (Model) => {
    return async (req, res, next) => {
        const { tenSp } = req.body;
        const result = await Model.findOne({
            where: {
                tenSp
            }
        })
        if (!result) {
            next();
        } else {
            res.status(404).send({ message: "Tên sản phẩm đã tồn tại!" })
        }
    }
}
module.exports = {
    checkExist,
    CheckSanPhamExists

}