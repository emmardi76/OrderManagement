namespace OrderManagementApp.Application.Dtos
{
    public class OrderLineQueryDto
    {
        public int? Id { get; set; }
        public int? OrderId { get; set; }       
        public int? TaxTypeId { get; set; }         
        public decimal? Total { get; set; }      
    }
}
