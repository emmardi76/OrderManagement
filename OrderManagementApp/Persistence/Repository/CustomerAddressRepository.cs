using Microsoft.EntityFrameworkCore;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

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

        public async Task<ICollection<CustomerAddress>> GetCustomerAddresses()
        {
            return  await _orderContext.CustomerAddresses.OrderBy(ca => ca.CustomerId).ToListAsync();
        }

        public async Task<ICollection<CustomerAddress>> GetCustomerAddressesByCustomerId(int customerId)
        {
            return await  _orderContext.CustomerAddresses.Where(ca => ca.CustomerId == customerId).ToListAsync();           
            
        }

        public async Task<bool> Save()
        {
            return await _orderContext.SaveChangesAsync() >= 0 ? true : false;
        }

        public void UpdateCustomerAddress(CustomerAddress customerAddress)
        {           
            _orderContext.CustomerAddresses.Update(customerAddress);           
        }
    }
}
