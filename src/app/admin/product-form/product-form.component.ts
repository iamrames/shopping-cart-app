import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  product = {} as Product;
  id;

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {
    this.categories$ = this.categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) { this.productService.getProduct(this.id).subscribe(x => this.product = x ); }
  }

  save(product) {
    if (this.id) {
       this.productService.updateProduct(this.id, product);
      } else {
        this.productService.create(product);
      }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete product?')) { return; }
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

}
