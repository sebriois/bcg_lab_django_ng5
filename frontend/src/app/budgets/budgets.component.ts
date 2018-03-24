import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../services/budgets.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
  }
}
