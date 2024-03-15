export interface Invoice {
  id: number;
  invoiceNumber?: string;
  customerId: number;
  customerAddressId: number;
  customerName?: string;
  date: Date;
  remarks: string;
  dueDate: Date;
  totalWithoutTaxes: number;
  total: number;
  totalTaxes: number;
}
