namespace OrderManagementApp.Application.Dtos
{
    public class OrderListDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string? CustomerName { get; set; }
        public string? OrderNumber { get; set; }
        public decimal TotalWithoutTaxes { get; set; }
        public decimal Total { get; set; }
        public decimal TotalTaxes { get; set; }        
    }
}
