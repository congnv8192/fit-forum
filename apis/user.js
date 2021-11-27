const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

const router = express.Router();

// all questions
router.get('/api/users', async function(req, res) {
    const users = await req.db.collection('users').find({}).toArray();

    res.json(users);
});

// user details
router.get('/api/users/:id', async function(req, res) {
    const id = req.params.id;
    try {
        const user = await req.db.collection('users').findOne({_id: mongodb.ObjectId(id) });  
        
        if (user) {
            return res.json(user);
        }
    } catch (error) {

    }

    return res.status(404).end('user not found');
});


// add new user
router.post('/api/users', async function (req, res) {
    const {username, password, displayName, avatar} = req.body;

    // validate data
    if (!username || !password || !displayName) { // null, undefined, '', [] 0
        return res.status(400).send('username & password & displayName are required');
    }

    // TODO: check if username exist

    // hash password
    const hashedPassword = await bcrypt.hash(password, 5);

    // insert into db
    const user = {
        username,
        password: hashedPassword,
        displayName, 
        avatar,
        createdAt: new Date(),
    };
    const result = await req.db.collection('users').insertOne(user);

    console.log(result); 

    res.status(201).json(user);
});

// edit 
router.put('/api/users/:id', async function (req, res) {
    const id = req.params.id;

    // check if id valid
    const user = await req.db.collection('users').findOne({ _id: mongodb.ObjectId(id) });
    if (!user) {
        return res.status(404).send('user not found');
    }

    const {username, displayName, avatar} = req.body;

    // validate data
    if (!username || !displayName) { // null, undefined, '', [] 0
        return res.status(400).send('username & displayName are required');
    }

    // insert into db
    // Object.assign(origin, {})
    const result = await req.db.collection('users').updateOne({ _id: mongodb.ObjectId(id) }, { $set: {
        username,
        displayName, 
        avatar,
        updatedAt: new Date(),
    }});

    console.log(result); 

    res.status(200).end();
});

// delete
router.delete('/api/users/:id', async function(req, res) {
    try {
        const id = req.params.id;
        const result = await req.db.collection('users').deleteOne({_id: mongodb.ObjectId(id)});
        console.log(result);
        
        res.status(204).end();
    } catch (e) {
        res.status(400).end('Invalid id!');
    }
});

module.exports = router;