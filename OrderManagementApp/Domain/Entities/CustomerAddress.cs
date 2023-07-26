using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Domain.Entities
{
    public class CustomerAddress
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

        public Customer? Customer { get; set; }
        public ICollection<Order>? Orders { get; set; }
    }
}
