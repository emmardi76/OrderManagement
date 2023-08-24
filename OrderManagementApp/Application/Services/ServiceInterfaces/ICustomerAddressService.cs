using OrderManagementApp.Application.Dtos;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface ICustomerAddressService
    {
        Task<ICollection<CustomerAddressDto>> GetCustomerAddresses();
        Task<ICollection<CustomerAddressDto>> GetCustomerAddressesByCustomerId(int customerId);
        Task CreateCustomerAddress(CustomerAddressDto customerAddressDto);
        Task UpdateCustomerAddress(CustomerAddressDto customerAddressDto);
        Task DeleteCustomerAddress(CustomerAddressDto customerAddressDto);  
    }
}
