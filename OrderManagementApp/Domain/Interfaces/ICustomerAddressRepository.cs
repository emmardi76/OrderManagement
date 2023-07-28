using OrderManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface ICustomerAddressRepository
    {
        ICollection<CustomerAddress> GetCustomerAddresses();
        CustomerAddress GetCustomerAddressesByCustomerId(int customerId);
        CustomerAddress CreateCustomerAddress(int customerId);
        bool UpdateCustomerAddress(int customerId);
        bool DeleteCustomerAddress(int customerId);
        bool Save();
    }
}
