using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface ICustomerService
    {
        Task<CustomerDto> CreateCustomer(CustomerDto customerDto);
        Task<ICollection<CustomerDto>> GetCustomers(CustomerQueryDto customerQueryDto);
        Task<CustomerDto> GetCustomerById(int id);
        Task<CustomerDto> UpdateCustomer(CustomerDto customer);
        Task DeleteCustomer(int id);       
        Task<ICollection<CustomerAddressDto>> GetCustomerAddressById(int id);
        Task<ICollection<OrderDto>> GetCustomerOrdersById(int id);
    }
}
