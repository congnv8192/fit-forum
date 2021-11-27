const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

// serve static files
app.use(express.static('public'));

// read body message from user -> req.body
// form data 
app.use(express.urlencoded({ extended: true }));
// json
app.use(express.json());

app.use(cookieSession({
    signed: false
})); // req.session

let db = null;
async function startServer() {
    // connect db mongodb+srv://admin:admin@cluster0.mynff.mongodb.net/fit-forum
    const client = await mongodb.MongoClient.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/fit-forum'); 
    db = client.db();
    console.log('connected to db.');

    // start listening
    app.listen(process.env.PORT || 3001, function() {
        console.log('listening on port 3001...');
    });
}
startServer();

// req.db
function setDb(req, res, next) {
    req.db = db;

    next();
}
app.use(setDb);

// question APIs
const questionAPIs = require('./apis/question');
app.use(questionAPIs);

const authAPIs = require('./apis/auth');
app.use(authAPIs);

// user api
const userAPIs = require('./apis/user');
const { currentUser } = require('./middlewares/current-user');
const { requireAuth } = require('./middlewares/require-auth');
app.use(currentUser,  requireAuth, userAPIs);