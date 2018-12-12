const express = require('express');
const path = require('path');
const parser = require('body-parser');
const React = require('react');
const ReactDOM = require('react-dom/server');
const GroceryItem = require('./models/GroceryItem.js');

require('babel-register')({
    presets: ['es2015', 'react']
});
require('./database.js');
let app = new express();
app
    .use(express.static(path.join(__dirname, '../.tmp')))
    .use('/bower_components',  express.static(path.join(__dirname, '../bower_components')))
    .get('/', function(req, res) {
        const application = React.createFactory(require('./../app/components/GroceryItemList.jsx'));
        GroceryItem.find(function(error, items) {
            const generated = ReactDOM.renderToString(application({
                items: [...items]
            }));
            res.render('./../app/index.ejs', { reactOutput: generated });
        });
        //res.render('./../app/index.ejs', {});
    })
    .listen('7777');

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
require('./routes/items.js')(app);