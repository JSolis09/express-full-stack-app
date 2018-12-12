const React = require('react');
const ReactDOM  = require('react-dom');
const GroceryItemList = require('./components/GroceryItemList.jsx');
const groceryItemStore = require('./stores/GroceryItemStore.jsx');
const app = document.getElementById('app');
let initial = groceryItemStore.getItems();
function render() {
    ReactDOM.render(<GroceryItemList items={initial} />, app);
}

groceryItemStore.onChange((items) => {
    initial = [...items];
    render();
});

render();