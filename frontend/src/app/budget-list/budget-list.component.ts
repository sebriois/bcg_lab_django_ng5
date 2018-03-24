import { Component, OnInit } from '@angular/core';
import {AlertService} from '../alerts/alerts.service';
import {BudgetService} from '../services/budgets.service';
import {BudgetModel} from '../budgets/budgets.model';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {
  constructor(private alertService: AlertService, private budgetService: BudgetService) { }

  budgets = this.budgetService.getBudgets();

  pagination = {
    totalItems: 0,
    itemsPerPage: 50,
    currentPage: 1,
    nextPage: null,
    prevPage: null
  };
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.budgetService.retrieveBudgets(this.pagination.currentPage).subscribe(response => {
      this.pagination.totalItems = response['count'];
      this.pagination.nextPage = response['next'];
      this.pagination.prevPage = response['previous'];
      this.loading = false;
    });
  }

  getPage(event: any): void {
    this.loading = true;
    this.budgetService.retrieveBudgets(event.page).subscribe(response => {
      this.pagination.totalItems = response['count'];
      this.pagination.currentPage = event.page;
      this.pagination.nextPage = response['next'];
      this.pagination.prevPage = response['previous'];
      this.loading = false;
    });
  }

  getAmountLeft(budget: BudgetModel): number {
    return budget.budgetlines
      .map(line => {
        if (line.credit) {
          return line.credit * line.quantity;
        }
        if (line.debit) {
          return line.debit * line.quantity * -1;
        }
      }).reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      }, 0);
  }

  getAmountSpent(budget: BudgetModel): number {
    return budget.budgetlines
      .filter(line => !!line.debit)
      .map(line => line.quantity * line.debit)
      .reduce((prevValue, currValue) => prevValue + currValue, 0);
  }
}
