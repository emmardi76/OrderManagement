using OrderManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Dtos
{
    public class OrderLineDto
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public int Quantity { get; set; }
        public int TaxTypeId { get; set; }
        public decimal TaxPercentage { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalWithoutTaxes { get; set; }
        public decimal Total { get; set; }
        public decimal TaxBase { get; set; }

        public ProductDto? Product { get; set; }
        public TaxTypeDto? TaxType { get; set; }        
        public OrderDto? Order { get; set; }
    }
}
