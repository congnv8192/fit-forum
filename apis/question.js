const express = require('express');
const { currentUser } = require('../middlewares/current-user');

const router = express.Router();

// all questions
router.get('/api/questions', async function(req, res) {
    const questions = await req.db.collection('questions').find({}).toArray();

    res.json(questions);
});

// add new question
router.post('/api/questions', currentUser, async function (req, res) {
    const {text, content} = req.body;

    // validate data
    if (!text || !content) { // null, undefined, '', [] 0
        return res.status(400).send('Text & content are required');
    }

    // insert into db
    const question = {
        text, content, 
        user: req.currentUser,
        createdAt: new Date(),
        answers: []
    };
    const result = await req.db.collection('questions').insertOne(question);

    console.log(result);

    res.status(201).json(question);
});

// edit 

// delete

module.exports = router;