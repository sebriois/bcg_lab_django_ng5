import { Component, OnInit } from '@angular/core';
import {AlertService} from '../alerts/alerts.service';
import {ProviderService} from '../provider.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})

export class ProvidersComponent implements OnInit {
  constructor(private alertService: AlertService, private providerService: ProviderService) { }

  providers = this.providerService.getProviders();
  pagination = this.providerService.pagination;
  loading = false;

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
}
