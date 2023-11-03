export interface Product {
  id: number;
  name: string;
  description: string;
  taxTypeId: number;
  taxPercentage?: number;
  unitPrice: number;
}
