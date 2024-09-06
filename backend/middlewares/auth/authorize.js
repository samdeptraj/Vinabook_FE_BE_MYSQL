const authorize = (req, res, next) => {
    const { user } = req;
    if (user.quyenHan === "admin") {
        next();
    } else {
        res.status(403).send("Ban da dang nhap nhung khong co quyen thao tac")
    }
}

module.exports = {
    authorize
}