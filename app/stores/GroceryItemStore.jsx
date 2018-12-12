const dispatcher = require('../dispatcher.js');
const helper = require('../helpers/RestHelper.js');

function GroceryItemStore() {
    let items = [];
    helper.get('api/items')
        .then((data) => {
            items = [...data];
            triggerListeners();
        });
    const listeners = [];

    function getItems() {
        return items;
    }

    function addGroceryItem(item) {
        helper.post('api/items', item)
            .then((res) => {
                items.push(res);
                triggerListeners();
            }, (error) => {
                console.error(error);
            })
        
    }

    function setGroceryItemBought(item, isBought) {
        let item_ = items.find((i) => i.name === item.name);
        helper.patch(`api/items/${item._id}`, Object.assign(item_, { purchased: isBought || false }))
            .then((res) => {
                item.purchased = isBought || false;
                triggerListeners();
            }, (err) => {
                console.error(err);
            });
    }

    function deleteGroceryItem(item) {
        helper.delete(`api/items/${item._id}`)
            .then((res) => {
                items = items.filter((_item) => _item.name !== item.name);
                triggerListeners();
            }, (err) => {
                console.error(err);
            });
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    function triggerListeners() {
        listeners.forEach((listener) => {
            listener(items);
        });
    }

    dispatcher.register((event) => {
        const split = event.type.split(':');
        if (split[0] === 'grocery-item') {
            switch (split[1]) {
                case 'add':
                    addGroceryItem(event.payload);
                    break;
                case 'delete':
                    deleteGroceryItem(event.payload);
                    break;
                case 'buy':
                    setGroceryItemBought(event.payload, true);
                    break;
                case 'unbuy':
                    setGroceryItemBought(event.payload, false);
                    break;
            }
        }
    });

    return {
        getItems: getItems,
        onChange: onChange
    }
}

module.exports = new GroceryItemStore();