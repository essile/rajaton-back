class Stock {
    constructor() {
        this.store = [];
    }

    addToStore(product) {
        this.store.push(product);
    }

    removeFromStore(productName) {
        this.store.map(product => {
            if (product == productName) {
                this.store.pop(productName);
                return true;
            } else {
                return false;
            }
        });
    }
}

module.exports = Stock;