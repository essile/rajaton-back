const Stock = require('../stock/stock')

class Product {
    
    constructor(name, category, price) {
        this.id = 1;
        this.name = name;
        this.category = category;
        this.price = price;
    }

    getProductInfo () {
        return `Product ${this.id} - ${this.name}, ${this.category}, ${this.price} e`
    }

    addToStock() {
        
    }
}

module.exports = Product;
