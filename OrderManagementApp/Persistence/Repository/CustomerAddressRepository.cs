using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Persistence.Repository
{
    public class CustomerAddressRepository : ICustomerAddressRepository
    {
        private readonly OrderContext _orderContext;
        public CustomerAddressRepository(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }

        public void CreateCustomerAddress(CustomerAddress customerAddress)
        {
             _orderContext.CustomerAddresses.Add(customerAddress);           
        }

        public void DeleteCustomerAddress(CustomerAddress customerAddress)
        {
            _orderContext.CustomerAddresses.Remove(customerAddress);           
        }

        public ICollection<CustomerAddress> GetCustomerAddresses()
        {
            return _orderContext.CustomerAddresses.OrderBy(ca => ca.CustomerId).ToList();
        }

        public ICollection<CustomerAddress> GetCustomerAddressesByCustomerId(int customerId)
        {
            return _orderContext.CustomerAddresses.Where(ca => ca.CustomerId == customerId).ToList();           
            
        }

        public bool Save()
        {
            return _orderContext.SaveChanges() >= 0 ? true : false;
        }

        public void UpdateCustomerAddress(CustomerAddress customerAddress)
        {           
            _orderContext.CustomerAddresses.Update(customerAddress);           
        }
    }
}
