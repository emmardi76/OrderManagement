using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Dtos
{
    public class InvoiceLineQueryDto
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }       
        public int TaxTypeId { get; set; }       
        public decimal Total { get; set; }       
    }
}
