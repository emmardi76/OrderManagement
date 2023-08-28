namespace OrderManagementApp.Application.Dtos
{
    public class ProductQueryDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }       
        public decimal UnitPrice { get; set; }
    }
}
