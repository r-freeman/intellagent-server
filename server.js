const path = require('path');
const express = require('express');
const cors = require('cors');
const mongooseConnect = require('./mongoose_connect');

import passport from 'passport';
import passportUseStrategy from './passport';
// const webhooks = require('./twitter/webhooks');

passportUseStrategy(passport);

const routes = require('./routes/index.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use('/api/v1', routes);

// serve the front end from react build directory
app.use(express.static(path.join(__dirname, './client/build')));

// return not found error if route does not exist
app.use(function (req, res, next) {
    if (!req.route) {
        res.status(404).send();
        return;
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
});

