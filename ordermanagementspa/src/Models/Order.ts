export interface Order {
  id: number;
  customerId: number;
  customerAddressId: number;
  date: Date;
  orderNumber: number;
  remarks: string;
  totalWithoutTaxes: number;
  total: number;
  totalTaxes: number;
}
