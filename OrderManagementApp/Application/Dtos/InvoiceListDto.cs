namespace OrderManagementApp.Application.Dtos
{
    public class InvoiceListDto
    {
        public int Id { get; set; }
        public string? InvoiceNumber { get; set; }
        public DateTime Date { get; set; }
        public string? CustomerName { get; set; }
        public DateTime DueDate { get; set; }
        public decimal TotalWithoutTaxes { get; set; }
        public decimal Total { get; set; }
        public decimal TotalTaxes { get; set; }
    }
}
