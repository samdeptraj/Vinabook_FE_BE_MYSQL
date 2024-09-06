const jwt = require('jsonwebtoken');
const authenticate2 = (req, res, next) => {
    const token = localStorage.getItem('token');
    if (decode) {
        const decode = jwt.verify(token, "admin2003");
        req.user = decode; //tao user o phan req = decode
        return next();
    } else {
        res.status(401).send({message: "Ban chua dang nhap"});
    }
}

module.exports = {
    authenticate2
}