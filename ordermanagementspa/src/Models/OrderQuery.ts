export interface OrderQuery {
  id?: number;
  customerId?: number;
  customerAddressId?: number;
  date?: Date;
  orderNumber?: number;
  remarks?: string;
  total?: number;
  totalTaxes?: number;
}
