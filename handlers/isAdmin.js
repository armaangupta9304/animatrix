module.exports = (req, res, next) => {
    if(req.session.isLoggedin && req.session.user.role === 1){
        next()
    } else {
        res.json({
            message: "Not Authenticated.",
            _error: 100
        });
    }
}