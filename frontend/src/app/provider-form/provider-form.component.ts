import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProviderModel} from '../providers/providers.model';
import {ProviderService} from '../provider.service';
import {AlertService} from '../alerts/alerts.service';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent implements OnInit {
  provider: ProviderModel = new ProviderModel();
  providerForm: FormGroup;
  submitted = false;


  constructor(private providerService: ProviderService, private formBuilder: FormBuilder, private alertService: AlertService) {
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.providerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.providerService.createProvider(this.provider).subscribe(
      provider => {
        this.submitted = false;
        this.alertService.success(provider.name + ' ajouté avec succès.');
        this.providerForm.reset();
      },
      error => {
        this.alertService.error((error.message) ? error.message : 'Erreur de création du fournisseur');
      }
    );
  }

}
