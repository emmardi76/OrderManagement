namespace OrderManagementApp.Domain.Entities
{
    public class TaxType
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal TaxPercentage { get; set; }

        public ICollection<Product>? Product { get; set; }
        public ICollection<OrderLine>? OrderLines { get; init; } = new HashSet<OrderLine>();
        public ICollection<InvoiceLine> InvoiceLines { get; init; } = new List<InvoiceLine>();
    }
}