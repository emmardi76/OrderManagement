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
        ICollection<Customer> GetCustomers();
        Customer GetCustomerById(int id);
        Customer CreateCustomer(Customer customer);
        bool UpdateCustomer(Customer customer);
        bool DeleteCustomerById(int id);
        bool Save();
        ICollection<CustomerAddress> GetCustomerAddressById(int id);
        ICollection<Order> GetCustomerOrdersById(int id);
    }
}
