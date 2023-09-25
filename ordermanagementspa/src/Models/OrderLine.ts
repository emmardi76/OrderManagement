export interface OrderLine {
  id: number;
  orderId: number;
  productId: number;
  name: string;
  quantity: number;
  taxTypeId: number;
  taxPercentage: number;
  unitPrice: number;
  totalWithoutTaxes: number;
  total: number;
  totalTaxes: number;
}
