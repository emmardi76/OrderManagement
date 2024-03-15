export interface InvoiceList {
  id: number;
  invoiceNumber?: string;
  date: Date;
  customerName: string;
  dueDate: Date;
  totalWithoutTaxes: number;
  total: number;
  totalTaxes: number;
}
