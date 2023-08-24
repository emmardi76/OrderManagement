using OrderManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Dtos
{
    public class TaxTypeDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int TaxPercentage { get; set; }

        //public ICollection<ProductDto>? Product { get; set; }
        //public ICollection<OrderLineDto>? OrderLines { get; init; } = new HashSet<OrderLineDto>();
    }
}
