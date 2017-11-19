import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  providersCount: number;
  providers: Array<Provider>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.providersCount = 0;
    this.http.get<Provider[]>('/api/providers').subscribe(data => {
      // Read the result field from the JSON response.
      this.providers = data;
    });
  }

  createProvider() {
    console.log('create provider');
  }
}

interface Provider {
  id: number;
  name: string;
  direct_reception: boolean;
  is_local: boolean;
  is_service: boolean;
  notes: string;
  reseller: string;
  users_in_charge: string[];
}
