namespace OrderManagementApp.Application.Dtos
{
    public class OrderQueryDto
    {
        public int? Id { get; set; }
        public int? CustomerId { get; set; }
        public int? CustomerAddressId { get; set; }
        public string? CustomerName { get; set; }
        public DateTime? Date { get; set; }
        public string? OrderNumber { get; set; }
        public string? Remarks { get; set; }        
        public decimal? Total { get; set; }
        public decimal? TotalTaxes { get; set; }
    }
}
