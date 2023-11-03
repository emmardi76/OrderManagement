using Microsoft.EntityFrameworkCore;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

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

        public void DeleteCustomer(Customer customer)
        {            
            _orderContext.Customers.Remove(customer);          
        }

        public async Task<ICollection<CustomerAddress>> GetCustomerAddressById(int id)
        {
            //return _orderContext.Customers.Where(c => c.Id == id).SelectMany(c => c.CustomerAddress!).ToList();

            //var list = _orderContext.CustomerAddresses.Where(c => c.CustomerId == id).ToList() ?? new List<CustomerAddress>();
            return await _orderContext.CustomerAddresses.Where(c => c.CustomerId == id).ToListAsync();
        }

        public async Task<Customer> GetCustomerById(int id)
        {           
            var customer = await _orderContext.Customers.FirstOrDefaultAsync(c => c.Id == id);
            if (customer == null)
            {
                return null;
            }
            return customer;
        }

        public async Task<ICollection<Order>> GetCustomerOrdersById(int id)
        {
            return (ICollection<Order>) await _orderContext.Customers.OrderBy(c => c.Orders).Where(c => c.Id == id).ToListAsync();
        }

        public async Task<ICollection<Customer>> GetCustomers(CustomerQueryDto? customerQueryDto=null)
        {
            var customers = _orderContext.Customers.AsQueryable<Customer>();

            if (customerQueryDto != null)
            {
                if (customerQueryDto.Id.HasValue)
                {
                    customers = customers.Where(c => c.Id == customerQueryDto.Id.Value);
                }

                if (customerQueryDto.FirstName is not null)
                {
                    customers = customers.Where(c => c.FirstName != null && c.FirstName.Contains(customerQueryDto.FirstName));
                }

                if (customerQueryDto.LastName is not null)
                {
                    customers = customers.Where(c => c.LastName != null && c.LastName.Contains(customerQueryDto.LastName));
                }

                if (customerQueryDto.PhoneNumber is not null)
                {
                    customers = customers.Where(c => c.PhoneNumber != null && c.PhoneNumber.Contains(customerQueryDto.PhoneNumber));
                }

                if (customerQueryDto.Email is not null)
                {
                    customers = customers.Where(c => c.Email != null && c.Email.Contains(customerQueryDto.Email));
                }

            }
            return await customers.OrderBy(c => c.FirstName).ToListAsync();
        }

        public async Task<ICollection<Customer>> SearchCustomer(string? param)
        {
            var customer =  _orderContext.Customers.AsQueryable<Customer>();

            if (!string.IsNullOrEmpty(param))            {

                //customer =  customer.Where(c => c.FirstName.Contains(param) || c.LastName.Contains(param));
                customer = customer.Where(c => (c.FirstName+" "+c.LastName).Contains(param));
            }

            return await customer.OrderBy(c => c.FirstName).ToListAsync();            

        }

        public async Task<bool> Save()
        {
            return await _orderContext.SaveChangesAsync() >=0 ? true: false;
        }

        public void  UpdateCustomer(Customer customer)
        {
            _orderContext.Customers.Update(customer);            
        }
    }
}
