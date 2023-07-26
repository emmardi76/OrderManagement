using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Domain.Entities
{
    public class TaxType
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int TaxPercentage { get; set; }

        public ICollection<Product>? Product { get; set; }
        public ICollection<OrderLine>? OrderLines { get; init; } = new HashSet<OrderLine>();
    }
}