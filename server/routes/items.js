module.exports = function (app) {
    const GroceryItem = require('../models/GroceryItem.js');

    app.route('/api/items')
        .get(function(req, res) {
            GroceryItem.find(function(error, items) {
                if (error) {
                    console.error(error);
                }
                res.send(items);
            });
        })
        .post(function(req, res) {
            let item = req.body;
            const groceryItem = new GroceryItem(item);
            groceryItem.save(function(error, data) {
                res.status(201).send(data);
            });
        });
    app.route('/api/items/:id')
        .delete(function(req, res) {
            console.log('removing ...', req.params.id);
            GroceryItem.deleteOne({
                _id: req.params.id
            }, function(err, x) {
                console.log('removed.', x);
                res.send({ success: true });
            });
        })
        .patch(function(req, res) {
            GroceryItem.findOne({
                _id: req.body._id
            }, function(error, item) {
                for (let key in req.body) {
                    item[key] = req.body[key];
                }
                item.save(function(err, item) {
                    if (err) {
                        res.status(500).send({ success: false, err: err });    
                    }
                    res.status(200).send({ success: true });
                });
            });
        });
}