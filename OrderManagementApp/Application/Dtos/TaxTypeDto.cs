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
        public decimal TaxPercentage { get; set; }        
    }
}
