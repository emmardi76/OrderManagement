export interface OrderList {
  id: number;
  customerName: string;
  date: Date;
  orderNumber: number;
  totalWithoutTaxes: number;
  total: number;
  totalTaxes: number;
}
