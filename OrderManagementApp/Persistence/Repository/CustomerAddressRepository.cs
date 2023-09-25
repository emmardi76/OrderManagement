using Microsoft.EntityFrameworkCore;
using OrderManagementApp.Application.Dtos;
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

        public async Task<ICollection<CustomerAddress>> GetCustomerAddresses(CustomerAddressQueryDto? customerAddressQueryDto=null)
        {
            var customerAdresses = _orderContext.CustomerAddresses.AsQueryable<CustomerAddress>();

            if (customerAddressQueryDto != null)
            {
                if (customerAddressQueryDto.Id.HasValue)
                {
                    customerAdresses = customerAdresses.Where(ca => ca.Id == customerAddressQueryDto.Id.Value);
                }

                if (customerAddressQueryDto.CustomerId.HasValue)
                {
                    customerAdresses = customerAdresses.Where(ca => ca.CustomerId == customerAddressQueryDto.CustomerId.Value);
                }

                if (customerAddressQueryDto.Description is not null)
                {
                    customerAdresses = customerAdresses.Where(ca => ca.Description != null && ca.Description.Contains(customerAddressQueryDto.Description));
                }
            }

            return  await customerAdresses.OrderBy(ca => ca.CustomerId).ToListAsync();
        }

        public async Task<CustomerAddress?> GetCustomerAddressById(int customerAddressId)
        {
            return await _orderContext.CustomerAddresses.FirstOrDefaultAsync(x => x.Id == customerAddressId);
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
