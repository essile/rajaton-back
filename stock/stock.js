const Product = require('../product/product');

class Stock {
    constructor() {
        this.store = [];
    }


    addToStore(product) {
        let success = false;

        if (Product.validProduct(product) === true) {
            this.store.push(product);
            success = true;
        }
        return success;
    }

    removeFromStore(productToBeRemoved) {
        let success = false;

        this.store.map(product => {
            if (product == productToBeRemoved) {
                this.store.pop(product);
                success = true;
            }
        });
        return success;
    }
}

module.exports = Stock;