const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path')
 
const app = express();

const Thing = require('./models/thing');
 
mongoose.connect('mongodb+srv://admin:tGp54eaXaqgsKk5A@so-pockockobdd.dp9nk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('Connection to MongoDB successful !'))
    .catch(() => console.log('Connection to MongoDB failed !')
);
 
app.use(bodyParser.json());
 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);
     
module.exports = app;