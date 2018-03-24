import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {BudgetLineModel, BudgetModel} from '../budgets/budgets.model';

@Injectable()
export class BudgetService {
  constructor(
    private http: HttpClient,
  ) {}

  private baseUrl = environment.apiUrl;

  protected _budgetsSubject: BehaviorSubject<BudgetModel[]> = new BehaviorSubject<BudgetModel[]>([]);
  protected _budgetLinesSubject: BehaviorSubject<BudgetLineModel[]> = new BehaviorSubject<BudgetLineModel[]>([]);

  toggleBudgetDetails = false;

  getBudgets(): Observable<BudgetModel[]> {
    return this._budgetsSubject.asObservable();
  }

  getBudgetLines(): Observable<BudgetLineModel[]> {
    return this._budgetLinesSubject.asObservable();
  }

  retrieveBudgets(page: number): Observable<any> {
    return this.http.get<BudgetModel[]>(
      this.baseUrl + '/budgets/?page=' + page
    ).map(response => {
      this._budgetsSubject.next(response['results']);
      return response;
    });
  }

  retrieveBudgetLines(page: number, filters = {}): Observable<any> {
    return this.http.get<BudgetLineModel[]>(
      this.baseUrl + '/budgetlines/?page=' + page, {params: filters}
    ).map(response => {
      this._budgetLinesSubject.next(response['results']);
      return response;
    });
  }
}
