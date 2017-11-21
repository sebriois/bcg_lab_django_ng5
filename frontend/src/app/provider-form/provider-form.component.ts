import { Component, OnInit } from '@angular/core';
import {Provider} from '../providers/providers.model';
import {ProviderService} from '../provider.service';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent implements OnInit {
  model: Provider = new Provider();
  submitted = false;

  constructor(private providerService: ProviderService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.providerService.createProvider(this.model);
    this.submitted = false;
  }

}
