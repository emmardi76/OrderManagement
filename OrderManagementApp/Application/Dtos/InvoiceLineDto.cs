using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Dtos
{
    public class InvoiceLineDto
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public int Quantity { get; set; }
        public int TaxTypeId { get; set; }
        public decimal TaxPercentage { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalWithoutTaxes { get; set; }
        public decimal Total { get; set; }
        public decimal TotalTaxes { get; set; } //check if we want this field here
    }
}