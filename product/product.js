const Stock = require('../stock/stock')

class Product {
    
    constructor(name, category, price) {
        this.id = 1;
        this.name = name;
        this.category = category;
        this.price = price;
    }

    static validProduct(product) {
        let response = false;

        if (product.name && product.price && product.category && product.id) {
            response = true;
        }
        return response;
    }

    getProductInfo () {
        return `Product ${this.id} - ${this.name}, ${this.category}, ${this.price} e`
    }
}

module.exports = Product;
