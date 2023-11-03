namespace OrderManagementApp.Application.Dtos
{
    public class OrderUpdateDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int CustomerAddressId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string? OrderNumber { get; set; }
        public string? Remarks { get; set; }
    }
}
