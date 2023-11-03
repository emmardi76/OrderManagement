export interface OrderQuery {
  id?: number;
  customerId?: number;
  customerAddressId?: number;
  customerName?: string;
  date?: string;
  orderNumber?: string;
  remarks?: string;
  total?: number;
  totalTaxes?: number;
}
