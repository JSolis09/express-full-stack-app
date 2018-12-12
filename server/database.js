const mongoose = require('mongoose');
const GroceryItem = require('./models/GroceryItem.js');

const dbURI = 'mongodb://localhost/grocery';

mongoose.connect(dbURI, { useNewUrlParser: true }, function() { 
    console.log('connected!!');
    GroceryItem.find(function(err, doc) {
        if (err) {
            console.error(err);
        }
        if (!doc.length) {
            let items = [
                { name: 'Ice Cream' },
                { name: 'Waffles' },
                { name: 'Candy', purchased: true },
                { name: 'Snarks' }
            ];
            items.forEach(function(item) {
                new GroceryItem(item).save()
            });
        }
    });
});

mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to ' + dbURI);
});
// If the connection throws an error
mongoose.connection.on('error',function (err) {  
console.log('Mongoose default connection error: ' + err);
});
