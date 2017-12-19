export class OrderModel {
  id: number;
  number: string;
  budget: string;
  team: string;
  provider: string;
  status: number;
  status_display: string;
  items: Array<OrderItemModel>;
  notes: string;
  is_confidential: string;
  is_urgent: string;
  has_problem: string;
  date_created: Date;
  date_delivered: Date;
  last_change: Date;
  last_change_human: string;
  attachments: string;
}

export class OrderItemModel {
  item_type: string;
  username: string;
  username_recept: string;
  product_id: string;
  name: string;
  origin: string;
  packaging: string;
  reference: string;
  offer_nb: string;
  category: string;
  sub_category: string;
  nomenclature: string;
  price: number;
  cost_type: string;
  quantity: number;
  delivered: string;
  is_confidential: string;
}
