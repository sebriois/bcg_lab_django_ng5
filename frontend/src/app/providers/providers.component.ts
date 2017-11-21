import { Component, OnInit } from '@angular/core';
import {AlertService} from '../alerts/alerts.service';
import {Provider} from './providers.model';
import {ProviderService} from '../provider.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  providerCount: Number = 0;
  providers: Array<Provider>;
  loading = false;

  constructor(private alertService: AlertService, private providerService: ProviderService) { }

  ngOnInit() {
    this.getProviders();
  }

  getProviders(): void {
    this.loading = true;
    this.providerService.getProviders().subscribe(providers => {
      this.providers = providers;
      this.providerCount = providers.length;
      this.loading = false;
    });
  }
}
