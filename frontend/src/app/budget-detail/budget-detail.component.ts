import { Component, OnInit } from '@angular/core';
import {BudgetService} from '../services/budgets.service';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss']
})
export class BudgetDetailComponent implements OnInit {

  constructor(private budgetService: BudgetService) { }

  budgetlines = this.budgetService.getBudgetLines();

  pagination = {
    totalItems: 0,
    itemsPerPage: 50,
    currentPage: 1,
    nextPage: null,
    prevPage: null
  };
  loading = false;

  ngOnInit() {
  }

}
