import { Component, OnInit } from '@angular/core';
import {AlertService} from '../alerts/alerts.service';
import {ProviderModel} from './providers.model';
import {ProviderService} from '../provider.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  providerCount: Number = 0;
  providers: Array<ProviderModel>;
  loading = false;

  constructor(private alertService: AlertService, private providerService: ProviderService) { }

  ngOnInit() {
    this.loading = true;
    this.providerService.getProviders().subscribe(providers => {
      this.providers = providers;
      this.providerCount = providers.length;
    });
    this.providerService.retrieveProviders().subscribe(providers => {
      this.loading = false;
    });
  }
}
