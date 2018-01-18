import { Component, OnInit } from '@angular/core';
import {AlertService} from '../alerts/alerts.service';
import {BudgetService} from './budgets.service';
import {BudgetModel} from './budgets.model';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  constructor(private alertService: AlertService, private budgetService: BudgetService) { }

  budgets = this.budgetService.getBudgets();
  pagination = this.budgetService.pagination;
  searchText: string;
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.budgetService.retrieveBudgets(this.pagination.currentPage).subscribe(response => {
      this.loading = false;
    });
  }

  getPage(event: any): void {
    this.loading = true;
    this.budgetService.retrieveBudgets(event.page).subscribe(response => {
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

  searchBudgets() {
    console.log(this.searchText);
  }
}
