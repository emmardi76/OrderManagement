export interface OrderUpdate {
  id: number;
  customerId: number;
  customerAddressId: number;
  customerName?: string;
  date: Date;
  orderNumber: string;
  remarks: string;
}
