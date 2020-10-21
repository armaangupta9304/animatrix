module.exports = (req, res, next) => {
    if (!req.session.isLoggedin) {
        res.json({
            message: "Authentication Failed Please Login Again.",
            _error: 99
        })
    } else {
        next();
    }
};
