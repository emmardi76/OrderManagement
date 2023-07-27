using OrderManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Dtos
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        public ICollection<CustomerAddressDto>? CustomerAddress { get; init; } = new List<CustomerAddressDto>();
        public ICollection<OrderDto>? Orders { get; init; } = new List<OrderDto>();
    }
}
