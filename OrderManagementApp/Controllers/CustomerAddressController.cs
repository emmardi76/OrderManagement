using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;

namespace OrderManagementApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CustomerAddressController: Controller
    {
        private readonly ICustomerAddressService _customerAddressService;

        public CustomerAddressController(ICustomerAddressService customerAddressService)
        {
            _customerAddressService = customerAddressService;
        }

        [AllowAnonymous]
        [HttpGet("GetCustomersAddresses")]
        public async Task<IActionResult> GetCustomerAddresses()
        {
           var ListCustomerAddresses = await  _customerAddressService.GetCustomerAddresses();
           return Ok(ListCustomerAddresses);
        }

        [AllowAnonymous]
        [HttpGet("GetCustomersAddresses/{customerId}")]
        public async Task<IActionResult> GetCustomerAddressesByCustomerId(int customerId)
        {
            var ListCustomerAddresses = await _customerAddressService.GetCustomerAddressesByCustomerId(customerId);
            return Ok(ListCustomerAddresses);
        }

        [HttpPost(Name = "CreateCustomerAddress")]
        public async Task<IActionResult> CreateCustomer(CustomerAddressDto customerAddressDto)
        {
           return (IActionResult)_customerAddressService.CreateCustomerAddress(customerAddressDto);
        }

        [HttpPut(Name = "UpdateCustomerAddress")]
        public async Task<IActionResult> UpdateCustomerAddress(CustomerAddressDto customerAddressDto)
        {
            return (IActionResult)_customerAddressService.UpdateCustomerAddress(customerAddressDto);
        }
       
        [HttpDelete(Name = "DeleteCustomerAddress")]
        public async Task<IActionResult> DeleteCustomerAddress(CustomerAddressDto customerAddressDto)
        {
            return (IActionResult)_customerAddressService.DeleteCustomerAddress(customerAddressDto);
        }
    }
}
