const { mkdirp } = require('mkdirp');
const multer = require('multer');

const uploadImage = (type) => {
    const made = mkdirp.sync(`./public/images/${type}`);
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./public/images/${type}`); //setup nơi lưu file
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "_" + file.originalname) //đặt lại tên file
        }
    })
    const upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            const extendListImagesTail = [".jpg", ".png", ".jpeg", ".webp"];
            const extend = file.originalname.slice(-4);
            const check = extendListImagesTail.includes(extend);
            if (check) {
                cb(null, true)
            } else {
                cb(new Error('Định dạng file không hợp lệ!'))
            }
        }
    })
    return upload.single("image");
}

module.exports = uploadImage;
