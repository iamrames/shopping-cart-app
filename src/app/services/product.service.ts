import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<any[]> {
    return this.db.list('/products').snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c =>
              ({key: c.payload.key, ...c.payload.val() })
              )));
  }

  getProduct(id): any {
    return this.db.object('/products/' + id).snapshotChanges()
        .pipe(
          map(changes => ({ key: changes.payload.key, ...changes.payload.val() }))
        );
  }

  updateProduct(id, product) {
    return this.db.object('/products/' + id).update(product);
  }

  deleteProduct(id) {
    return this.db.object('/products/' + id).remove();
  }

}
