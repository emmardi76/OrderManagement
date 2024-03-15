export interface InvoiceQuery {
  id?: number;
  invoiceNumber?: string;
  customerId?: number;
  customerAddressId?: number;
  customerName?: string;
  date?: string;
  remarks?: string;
  dueDate?: string;
  total?: number;
  totalTaxes?: number;
}
