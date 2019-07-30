import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {

    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: {productId: ShoppingCartItem}) {
        // tslint:disable-next-line: forin
        for (const product in itemsMap) {
            this.items.push(itemsMap[product]);
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
}
