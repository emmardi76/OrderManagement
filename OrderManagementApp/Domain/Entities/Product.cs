using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int TaxTypeId { get; set; }
        public decimal UnitPrice { get; set; }

        public TaxType?  TaxType { get; set;}
        public ICollection<OrderLine> OrderLines { get; init; } = new List<OrderLine>();
        public ICollection<InvoiceLine> InvoiceLines { get; init; } = new List<InvoiceLine>();
    }
}
