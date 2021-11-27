const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/api/auth/login', async function(req, res) {
    const {username, password} = req.body;

    // check if any user with username
    const user = await req.db.collection('users').findOne({username});
    if (user) {
        // check if password match
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
            // log user in
            // generate jwt
            const payload = {
                id: user.id,
                username: user.username,
                displayName: user.displayName,
                avatar: user.avatar
            };
            const userJwt = jwt.sign(payload, 'fit-forum');
            req.session = {
                jwt : userJwt
            };

            return res.json(user);
        }
    }

    res.status(400).end('Invalid credentials!');
});

router.post('/api/auth/logout', function (req, res) {
    req.session = null;
    
    res.end();
});

module.exports = router;