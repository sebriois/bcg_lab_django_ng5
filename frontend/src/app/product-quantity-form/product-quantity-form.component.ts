import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";
import {ProductModel} from "../models/products.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../services/order.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'modal-content',
  templateUrl: './product-quantity-form.component.html',
  styleUrls: ['./product-quantity-form.component.scss']
})
export class ProductQuantityFormComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ) { }

  product: ProductModel;
  quantityForm: FormGroup;
  loading = false;

  ngOnInit() {
    this.quantityForm = this.formBuilder.group({
      quantity: ['', [Validators.required, Validators.min(1)]],
    })
  }

  setProduct(product: ProductModel) {
    this.product = product;
  }

  addToCart() {
    let formValues = this.quantityForm.value;
    this.loading = true;
    this.orderService.addToCart(this.product, formValues.quantity).subscribe(
      () => {
        this.toastr.success('quantité: ' + formValues.quantity.toString(), 'Produit ajouté au panier avec succès!');
        this.bsModalRef.hide();
      },
      response => {
        this.toastr.error(response.error, 'Erreur');
      },
      () => {
        this.loading = false;
      }
    );
  }
}
