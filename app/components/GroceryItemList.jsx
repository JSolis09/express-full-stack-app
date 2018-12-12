const React = require('react');
const createReactClass = require('create-react-class');
const GroceryItem = require('./GroceryItem.jsx');
const GroceryListAddItem = require('./GroceryListAddItem.jsx');

const GroceryItemList = createReactClass({
    render: function() {
        return (
            <div>
                <h1>Grocery Listify</h1>
                <div>
                    {
                        this.props
                            .items
                            .map((item, index) => <GroceryItem key={'item'+index} item={item} />)
                    }
                </div>
                <GroceryListAddItem />
            </div>
        );
    }
});
module.exports = GroceryItemList;