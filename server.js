const express = require('express');
const bodyParser = require('body-parser');

const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.options('*', (req, res) => {
    res.sendStatus(200);
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.error('Error initializing the database:', err);
    }
    else {
        app.listen(port, () => console.log(`Database listening and running on port ${port}`));
    }
});



