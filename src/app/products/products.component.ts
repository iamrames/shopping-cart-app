import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) {

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

}
