
// email
const CheckExists = (Model) => {
    return async (req, res, next) => {
        const { email } = req.body;
        const result = await Model.findOne({
            where: {
                email
            }
        })
        if (!result) {
            next();
        } else {
            res.status(404).send("Email đã tồn tại!")
        }

    }
}

module.exports = CheckExists