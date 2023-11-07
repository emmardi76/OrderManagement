namespace OrderManagementApp.Application.Dtos
{
    public class InvoiceUpdateDto
    {
        public int Id { get; set; }
        public string? InvoiceNumber { get; set; }
        public int CustomerId { get; set; }
        public int CustomerAddressId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string? Remarks { get; set; }
        public DateTime DueDate { get; set; }
    }
}
