export class BudgetLineModel {
  team: string;
  budget: string;
  budget_type: string;
  nature: string;
  number: string;
  date: Date;
  origin: string;
  provider: string;
  product: string;
  quantity: number;
  product_price: number;
  credit: number;
  debit: number;
  confidential: boolean;
  is_active: boolean;
}

export class BudgetModel {
  team: string;
  name: string;
  default_origin: string;
  budget_type: string;
  default_nature: string;
  tva_code: string;
  domain: string;
  is_active: boolean;
  budgetlines: BudgetLineModel[];
}
