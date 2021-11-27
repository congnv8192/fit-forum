const jwt = require('jsonwebtoken');

function currentUser(req, res, next) {
    // req.currentUser
    if (req.session.jwt) {
        try {
            const payload = jwt.verify(req.session.jwt, 'fit-forum');
            req.currentUser = payload;
        } catch (error) { }
    }

    next();
}

module.exports.currentUser = currentUser;