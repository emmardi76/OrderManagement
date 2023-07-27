using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Domain.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int CustomerAddressId{ get; set; }
        public DateTime Date { get; set; }
        public int OrderNumber { get; set; }
        public string? Remarks { get; set; }
        public decimal TotalWithoutTaxes { get; set; }
        public decimal Total { get; set; }
        public decimal TaxBase { get; set; } //check if we want this field here

        public Customer? Customer { get; set; }
        public CustomerAddress? CustomerAddress { get; set; }
        public ICollection<OrderLine>? OrderLines { get; init; } = new List<OrderLine>();
    }
}
