const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
    // req.currentUser
    if (!req.currentUser) {
        return res.status(403).send('STOP!');
    }

    next();
}

module.exports.requireAuth = requireAuth;