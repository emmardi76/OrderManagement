using OrderManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Dtos
{
    public class CustomerAddressDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string? Description { get; set; }
        public string? Street { get; set; }
        public string? StreetNumber { get; set; }
        public string? Door { get; set; }
        public string? ZipCode { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }

        //public CustomerDto? Customer { get; set; }
        //public ICollection<OrderDto>? Orders { get; init; } = new List<OrderDto>();

    }
}
