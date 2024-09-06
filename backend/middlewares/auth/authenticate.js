const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
    const token = req.header("token");
    const decode = jwt.verify(token, "admin2003");
    if (decode) {
        req.user = decode; //tao user o phan req = decode
        return next();
    } else {
        res.status(401).send('Ban chua dang nhap');
    }
}

module.exports = {
    authenticate
}