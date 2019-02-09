const Stock = require('./stock');
const Product = require('../product/product');

describe('Stock', () => {
    let stock;

    beforeEach(() => {
        stock = new Stock();
    })

    it('has a `store` property', () => {
        expect(stock).toHaveProperty(`store`);
    });

    describe('addToStore()', () => {
        it('adds a product to the store', () => {
            let product = new Product('test', 'soap', 15);
            stock.addToStore(product);
            expect(stock.store).toHaveLength(1);
        });
    });

    describe('deleteFromStore()', () => {

        let product1, product2, product3;

        beforeEach(() => {
            product1 = new Product('test1', 'soap', 15);
            stock.addToStore(product1);
            product2 = new Product('test2', 'beard oil', 22);
            stock.addToStore(product2);
            product3 = new Product('test3', 'deodorant', 16);
            stock.addToStore(product3);
        });

        it('removes a product from the store', () => {
            stock.removeFromStore(product2);
            expect(stock.store).toHaveLength(2);
        });
    });
});