import { Component, OnInit } from '@angular/core';
import {ProviderService} from './provider.service';
import {BsModalService} from "ngx-bootstrap/modal";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ProviderModel} from "./providers.model";
import {ProviderFormComponent} from "../provider-form/provider-form.component";

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})

export class ProvidersComponent implements OnInit {
  bsModalRef: BsModalRef;
  providers = this.providerService.getProviders();
  pagination = this.providerService.pagination;
  loading = false;

  constructor(
    private modalService: BsModalService,
    private providerService: ProviderService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.providerService.retrieveProviders(this.pagination.currentPage).subscribe(response => {
      this.loading = false;
    });
  }

  getPage(event: any): void {
    this.loading = true;
    this.providerService.retrieveProviders(event.page).subscribe(response => {
      this.loading = false;
    });
  }

  showCreateForm(): void {
    this.bsModalRef = this.modalService.show(ProviderFormComponent);
  }

  showEditForm(provider: ProviderModel): void {
    this.bsModalRef = this.modalService.show(ProviderFormComponent);
    this.bsModalRef.content.setProvider(provider);
  }
}
