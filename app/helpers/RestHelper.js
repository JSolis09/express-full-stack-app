module.exports = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url)
            .then((response) => {
                resolve(response.json());
            }), (e) => {
                reject(e);
            };
        })
    },
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                resolve(response.json());
            }), (e) => {
                reject(e);
            };
        })
    },
    patch: (url, data) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                resolve(response.json());
            }), (e) => {
                reject(e);
            };
        })
    },
    delete: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                resolve(response.json());
            }), (e) => {
                reject(e);
            };
        })
    }
};