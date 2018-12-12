const React = require('react');
const createReactClass = require('create-react-class');
const action = require('../actions/GroceryItemActionCreator.jsx');

const GroceryListAddItem = createReactClass({
    getInitialState: function() {
        return { input: '' };
    },
    handleInputName: function(e) {
        this.setState({
            input: e.target.value
        });
    },
    addItem: function(e) {
        e.preventDefault();
        action.add({
            name: this.state.input
        });
        this.setState({
            input: ''
        });
    },
    render: function() {
        return (
            <div className="grocery-addItem">
                <form onSubmit={this.addItem}>
                    <input type="text" value={this.state.input} onChange={this.handleInputName} />
                    <button type="submit">Add Item</button>
                </form>
            </div>
        );
    }
});
module.exports = GroceryListAddItem;