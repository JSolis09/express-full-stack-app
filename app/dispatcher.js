const guid = require('guid');
const listeners = {};

module.exports = {
    register: (cb) => {
        const id = guid.raw();
        listeners[id] = cb;
        return id;
    },
    dispatch: (payload) => {
        console.info('Dispatching...', payload);
        for(const index in listeners) {
            const listener = listeners[index];
            listener(payload);
        }
    }
};