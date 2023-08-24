using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Dtos
{
    public class TaxQueryDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public int? TaxPercentage { get; set; }
    }
}
