using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface ICustomerRepository
    {
        Task<ICollection<Customer>> GetCustomers(CustomerQueryDto customerQueryDto);
        Task<Customer> GetCustomerById(int id);
        Customer CreateCustomer(Customer customer);
        void UpdateCustomer(Customer customer);
        void DeleteCustomerById(int id);
        Task<bool> Save();
        Task<ICollection<CustomerAddress>> GetCustomerAddressById(int id);
        Task<ICollection<Order>> GetCustomerOrdersById(int id);
    }
}