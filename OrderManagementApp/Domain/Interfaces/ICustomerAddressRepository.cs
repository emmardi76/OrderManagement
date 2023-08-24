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
        Task<ICollection<CustomerAddress>> GetCustomerAddresses();
        Task<ICollection<CustomerAddress>> GetCustomerAddressesByCustomerId(int customerId);
        void CreateCustomerAddress(CustomerAddress customerAddress);
        void UpdateCustomerAddress(CustomerAddress customerAddress);
        void DeleteCustomerAddress(CustomerAddress customerAddress);
        Task<bool> Save();
    }
}
