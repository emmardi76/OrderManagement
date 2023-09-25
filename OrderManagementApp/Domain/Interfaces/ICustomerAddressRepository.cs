using OrderManagementApp.Application.Dtos;
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
        Task<ICollection<CustomerAddress>> GetCustomerAddresses(CustomerAddressQueryDto customerAddressQueryDto);
        Task<CustomerAddress?> GetCustomerAddressById(int customerAddressId);
        Task<ICollection<CustomerAddress>> GetCustomerAddressesByCustomerId(int customerId);
        void CreateCustomerAddress(CustomerAddress customerAddress);
        void UpdateCustomerAddress(CustomerAddress customerAddress);
        void DeleteCustomerAddress(CustomerAddress customerAddress);
        Task<bool> Save();
    }
}
