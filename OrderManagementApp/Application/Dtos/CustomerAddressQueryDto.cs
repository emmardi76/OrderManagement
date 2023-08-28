using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Dtos
{
    public class CustomerAddressQueryDto
    {
        public int? Id { get; set; }
        public int? CustomerId { get; set; }
        public string? Description { get; set; }
    }
}
