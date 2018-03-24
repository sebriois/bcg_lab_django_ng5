import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../services/budgets.service';
import {AlertService} from '../alerts/alerts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-budget-filter-form',
  templateUrl: './budget-filter-form.component.html',
  styleUrls: ['./budget-filter-form.component.scss']
})
export class BudgetFilterFormComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private budgetService: BudgetService,
    private router: Router
  ) { }

  private isHidden = false;
  private filters = {};
  private loading = false;

  ngOnInit() {
  }

  togglePanel() {
    this.isHidden = !this.isHidden;
  }

  searchBudgetLines() {
    this.budgetService.toggleBudgetDetails = true;
    this.loading = true;
    this.budgetService.retrieveBudgetLines(1, this.filters).subscribe(response => {
      this.loading = false;
    });
  }
}
