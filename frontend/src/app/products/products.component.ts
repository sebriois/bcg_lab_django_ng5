import { Component, OnInit } from '@angular/core';
import {AlertService} from '../alerts/alerts.service';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private alertService: AlertService, private productService: ProductService) { }

  products = this.productService.getProducts();
  pagination = this.productService.pagination;
  searchText: string;
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.productService.retrieveProducts(this.pagination.currentPage).subscribe(response => {
      this.loading = false;
    });
  }

  getPage(event : any): void {
    this.loading = true;
    this.productService.retrieveProducts(event.page).subscribe(response => {
      this.loading = false;
    });
  }

  searchProducts() {
    console.log(this.searchText);
  }
}
