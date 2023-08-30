namespace OrderManagementApp.Domain.Entities
{
    public class OrderLine
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string ?Name { get; set; }
        public int Quantity { get; set; }
        public int TaxTypeId { get; set; }
        public decimal TaxPercentage { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalWithoutTaxes { get; set; }
        public decimal Total { get; set;}
        public decimal TotalTaxes { get; set; } //check if we want this field here

        public Product? Product { get; set; }    
        public TaxType? TaxType { get; set; }
        public Order? Order { get; set; }
    }
}
