namespace OrderManagementApp.Domain.Entities
{
    public class Invoice
    {
        public int Id { get; set; }
        public string? InvoiceNumber { get; set; }
        public int CustomerId { get; set; }
        public int CustomerAddressId { get; set; }
        public DateTime Date { get; set; }
        public string? Remarks { get; set; }
        public DateTime DueDate { get; set; }
        public decimal TotalWithoutTaxes { get; set; }
        public decimal Total { get; set; }
        public decimal TotalTaxes { get; set; } //check if we want this field here

        public Customer? Customer { get; set; }
        public CustomerAddress? CustomerAddress { get; set; }       
        public ICollection<InvoiceLine> InvoiceLines { get; init; } = new List<InvoiceLine>();
    }
}
