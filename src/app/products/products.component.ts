import { ShoppingCartService } from './../services/shopping-cart.service';
import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  destroy$ = new Subject();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService) {

      this.productService.getAll()
        .pipe(
          switchMap(products => {
            this.products = products;
            return this.route.queryParamMap;
          })
        )
        .subscribe(params => {
          this.category = params.get('category');

          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
        });
   }

   async ngOnInit() {
    (await this.cartService.getCart())
    .pipe(takeUntil(this.destroy$))
    .subscribe(cart => this.cart = cart);
   }

   ngOnDestroy() {
     this.destroy$.next();
   }

}
