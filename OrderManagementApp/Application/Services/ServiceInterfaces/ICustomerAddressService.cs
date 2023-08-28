using OrderManagementApp.Application.Dtos;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface ICustomerAddressService
    {
        Task<ICollection<CustomerAddressDto>> GetCustomerAddresses(CustomerAddressQueryDto customerAddressQueryDto);
        Task<ICollection<CustomerAddressDto>> GetCustomerAddressesByCustomerId(int customerId);
        Task CreateCustomerAddress(CustomerAddressDto customerAddressDto);
        Task UpdateCustomerAddress(CustomerAddressDto customerAddressDto);
        Task DeleteCustomerAddress(CustomerAddressDto customerAddressDto);  
    }
}
