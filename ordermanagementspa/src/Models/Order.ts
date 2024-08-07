export interface Order {
  id: number;
  customerId: number;
  customerAddressId: number;
  customerName?: string;
  date: Date;
  orderNumber: string;
  remarks: string;
  totalWithoutTaxes: number;
  total: number;
  totalTaxes: number;
}
