namespace OrderManagementApp.Application.Dtos
{
    public class InvoiceQueryDto
    {
        public int? Id { get; set; }
        public string? InvoiceNumber { get; set; }
        public int? CustomerId { get; set; }
        public int? CustomerAddressId { get; set; }
        public string? CustomerName { get; set; } = string.Empty;
        public DateTime? Date { get; set; }
        public string? Remarks { get; set; }
        public DateTime? DueDate { get; set; }       
        public decimal? Total { get; set; }
        public decimal? TotalTaxes { get; set; } //check if we want this field here
    }
}
