using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface ICustomerService
    {
        public CustomerDto CreateCustomer(CustomerDto customerDto);
        public ICollection<CustomerDto> GetCustomers();
        public CustomerDto GetCustomerById(int id);
        public bool UpdateCustomer(Customer customer);// check it pass CustomerDto so a param
        public void DeleteCustomer(int id);
        public bool Save();
        public ICollection<CustomerAddressDto> GetCustomerAddressById(int id);
        public ICollection<OrderDto> GetCustomerOrdersById(int id);
    }
}
