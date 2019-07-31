import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {

    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: {productId: ShoppingCartItem}) {
        // tslint:disable-next-line: new-parens
        this.itemsMap = itemsMap || { productId: new ShoppingCartItem };
        // tslint:disable-next-line: forin
        for (const productId in itemsMap) {
            const item: ShoppingCartItem = itemsMap[productId];
            this.items.push(new ShoppingCartItem({ ...item, key: productId}));
        }
    }

    get totalItemsCount() {
        let count = 0;
        // tslint:disable-next-line: forin
        for (const product in this.items) {
            count += this.items[product].quantity;
        }
        return count;
    }

    get productIds() {
        return Object.keys(this.items);
    }

    get totalPrice() {
        let sum = 0;
        // tslint:disable-next-line: forin
        for (const productId in this.items) { sum += this.items[productId].totalPrice; }
        return sum;
    }

    getQuantity(product: Product) {
        const item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }
}
