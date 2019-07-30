import { Product } from './../models/product';
import { AngularFireDatabase, DatabaseSnapshot, AngularFireAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async  getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    const snapShot: Observable<any> = this.db.object('/shopping-carts/' + cartId).snapshotChanges()
        .pipe(
          map(changes => ({ key: changes.payload.key, ...changes.payload.val() }))
        );
    return snapShot.pipe(map(x => new ShoppingCart(x.items)));
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string): Observable<any> {
    const itemRef = this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
    return itemRef.snapshotChanges().pipe(
      map(changes => ({ key: changes.payload.key, ...changes.payload.val() }))
    );
  }

  async addToCart(product: Product) {
    this.updateItemQuantiy(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantiy(product, -1);
  }

  private async updateItemQuantiy(product: Product, change: number) {
    let exist;
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    const ref = this.db.database.ref('/shopping-carts/' + cartId + '/items/').child(product.key);
    ref.once('value', snap => exist = snap.exists());

    item$.pipe(take(1)).subscribe(item => {
        ref.update({product, quantity: (item.quantity || 0) + change });
    });
  }

}
