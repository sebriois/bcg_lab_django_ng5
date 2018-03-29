import {Component, OnInit, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProviderModel, ResellerModel} from '../models/providers.model';
import {ProviderService} from '../services/provider.service';
import {AlertService} from '../alerts/alerts.service';
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: 'modal-content',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent implements OnInit {
  providerForm: FormGroup;
  resellers: ResellerModel[];
  submitted = false;
  hasErrors = false;
  provider: ProviderModel;

  constructor(
    public bsModalRef: BsModalRef,
    private providerService: ProviderService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.providerForm = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required]],
      reseller: null,
      direct_reception: false,
      is_local: false,
      is_service: false,
      notes: '',
      users_in_charge: [[]]
    });
    this.providerService.getResellers().subscribe(resellers => {
      this.resellers = resellers;
    });
  }

  ngOnChanges() {
    this.providerForm.reset({
      id: this.provider && this.provider.id || null,
      name: this.provider && this.provider.name || '',
      reseller: this.provider && this.provider.reseller || null,
      direct_reception: this.provider && this.provider.direct_reception || false,
      is_local: this.provider && this.provider.is_local || false,
      is_service: this.provider && this.provider.is_service || false,
      notes: this.provider && this.provider.notes || '',
      users_in_charge: this.provider && this.provider.users_in_charge || []
    });
  }

  setProvider(provider: ProviderModel) {
    this.provider = provider;
    this.ngOnChanges();
  }

  prepareSaveProvider(): ProviderModel {
    const formModel = this.providerForm.value;

    const saveProvider: ProviderModel = {
      id: formModel.id,
      name: formModel.name as string,
      direct_reception: formModel.direct_reception as boolean,
      is_local: formModel.is_local as boolean,
      is_service: formModel.is_service as boolean,
      notes: formModel.notes as string,
      reseller: formModel.reseller as number
    };

    if (formModel.users_in_charge) {
      saveProvider.users_in_charge = formModel.users_in_charge;
    }

    if (this.provider) {
      saveProvider.id = this.provider.id;
    }

    return saveProvider;
  }

  revert() {
    this.ngOnChanges();
  }

  updateOrCreate() {
    this.submitted = true;
    let saveProvider = this.providerForm.value;

    if ( this.provider ) {
      this.providerService.updateProvider(saveProvider).subscribe(
        provider => {
          this.alertService.success(provider.name + ' modifié avec succès.');
          this.bsModalRef.hide();
        },
        response => {
          this.submitted = false;
          for(let fieldName in response.error) {
            if (this.providerForm.controls.hasOwnProperty(fieldName)) {
              this.providerForm.controls[fieldName].setErrors({'incorrect': true});
            }
          }
          this.hasErrors = true;
        }
      );
    }
    else {
      this.providerService.createProvider(saveProvider).subscribe(
        provider => {
          this.submitted = false;
          this.alertService.success(provider.name + ' ajouté avec succès.');
          this.bsModalRef.hide();
        },
        response => {
          this.submitted = false;
          for(let fieldName in response.error) {
            if (this.providerForm.controls.hasOwnProperty(fieldName)) {
              this.providerForm.controls[fieldName].setErrors({'incorrect': true});
            }
          }
          this.hasErrors = true;
        }
      );
    }
  }

}
