import { Component, OnInit } from '@angular/core';
import {AlertService} from '../alerts/alerts.service';
import {ProductService} from '../services/product.service';
import {BsModalService} from "ngx-bootstrap/modal";
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";
import {ProductModel} from "../models/products.model";
import {ProductQuantityFormComponent} from "../product-quantity-form/product-quantity-form.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private alertService: AlertService,
    private productService: ProductService
  ) { }

  products = this.productService.getProducts();
  pagination = this.productService.pagination;
  bsModalRef: BsModalRef;
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

  showQuantityForm(product: ProductModel): void {
    console.log(product);
    this.bsModalRef = this.modalService.show(ProductQuantityFormComponent);
    this.bsModalRef.content.setProduct(product);
  }
}
