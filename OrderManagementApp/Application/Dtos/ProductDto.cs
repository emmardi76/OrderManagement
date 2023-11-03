namespace OrderManagementApp.Application.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int TaxTypeId { get; set; }
        public decimal TaxPercentage { get; set; }
        public decimal UnitPrice { get; set; }           
    }
}
