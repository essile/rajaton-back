const Product = require('./product');

describe('Test product `Juniper`', () => {
    let product;

    beforeEach(() => {
        product = new Product('Juniper', 'beard oil', 22.95);
    });

    it('has an automatically generated `id`', () => {
        expect(product).toHaveProperty('id');
    });

    it('has a `name` property that matches `Juniper`', () => {
        expect(product.name).toMatch('Juniper');
    });

    it('has a `price` property with key `22.95`', () => {
        expect(product).toHaveProperty('price', 22.95);
    });
})