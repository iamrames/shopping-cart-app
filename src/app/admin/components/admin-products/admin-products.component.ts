import { Product } from 'shared/models/product';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  products: Product[];
  filteredProducts: any[];
  destroy$ = new Subject();

  constructor(private productService: ProductService) {
    this.productService.getAll()
            .pipe(takeUntil(this.destroy$))
            .subscribe(products => this.filteredProducts = this.products = products );
   }

   filter(query: string) {
     this.filteredProducts = (query) ?
        this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
        this.products;
   }

   ngOnDestroy() {
    this.destroy$.next();
   }
}
