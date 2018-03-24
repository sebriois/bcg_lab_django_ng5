import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../services/budgets.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-budgetlines',
  templateUrl: './budgetlines.component.html',
  styleUrls: ['./budgetlines.component.scss']
})
export class BudgetLinesComponent implements OnInit {

  constructor(
    private budgetService: BudgetService,
    private route: ActivatedRoute
  ) {}

  budgetlines = this.budgetService.getBudgetLines();

  pagination = {
    totalItems: 0,
    itemsPerPage: 50,
    currentPage: 1,
    nextPage: null,
    prevPage: null
  };
  routeParams = {};
  loading: boolean;

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.routeParams = params;
      this.loading = true;
      this.budgetService.retrieveBudgetLines(this.pagination.currentPage, this.routeParams).subscribe(response => {
        this.pagination.totalItems = response['count'];
        this.pagination.nextPage = response['next'];
        this.pagination.prevPage = response['previous'];
        this.loading = false;
      });
    });
  }

  pageChanged(event): void {
    console.log('get page ' + event.page, this.routeParams);
    this.loading = true;
    this.budgetService.retrieveBudgetLines(event.page, this.routeParams).subscribe(response => {
      this.pagination.totalItems = response['count'];
      this.pagination.currentPage = event.page;
      this.pagination.nextPage = response['next'];
      this.pagination.prevPage = response['previous'];
      this.loading = false;
    });
  }

}
