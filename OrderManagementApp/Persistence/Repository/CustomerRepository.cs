using Microsoft.IdentityModel.Tokens;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Persistence.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly OrderContext _orderContext;

        public CustomerRepository(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }

        public Customer CreateCustomer(Customer customer)
        {
            _orderContext.Customers.Add(customer);
            return customer;
        }

        public bool DeleteCustomerById(int id)
        {
            Customer customer = GetCustomerById(id);
            _orderContext.Customers.Remove(customer);
            return Save();
        }

        public ICollection<CustomerAddress> GetCustomerAddressById(int id)
        {
            //return _orderContext.Customers.Where(c => c.Id == id).SelectMany(c => c.CustomerAddress!).ToList();

            //var list = _orderContext.CustomerAddresses.Where(c => c.CustomerId == id).ToList() ?? new List<CustomerAddress>();
            return _orderContext.CustomerAddresses.Where(c => c.CustomerId == id).ToList();
        }

        public Customer GetCustomerById(int id)
        {           
            var customer = _orderContext.Customers.FirstOrDefault(c => c.Id == id);
            if (customer == null)
            {
                return null;
            }
            return customer;
        }

        public ICollection<Order> GetCustomerOrdersById(int id)
        {
            return (ICollection<Order>)_orderContext.Customers.OrderBy(c => c.Orders).Where(c => c.Id == id).ToList();
        }

        public ICollection<Customer> GetCustomers()
        {
            return _orderContext.Customers.OrderBy(c => c.FirstName).ToList();
        }

        public bool Save()
        {
            return _orderContext.SaveChanges() >=0 ? true: false;
        }

        public bool UpdateCustomer(Customer customer)
        {
            _orderContext.Customers.Update(customer);
            return Save();
        }
    }
}
