using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Domain.Entities
{
    public class Customer
    {   
        public int Id { get; set; }
        public string? FirstName { get; set; }    
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        public ICollection<CustomerAddress>? CustomerAddress { get; init; } = new List<CustomerAddress>();
        public ICollection<Order>? Orders { get; init; } = new List<Order>();
    }
}