export interface InvoiceUpdate {
  id: number;
  invoiceNumber?: string;
  customerId: number;
  customerAddressId: number;
  customerName?: string;
  date: Date;
  remarks: string;
  dueDate: Date;
}
