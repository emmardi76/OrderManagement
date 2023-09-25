﻿using Microsoft.AspNetCore.Authorization;
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
        [HttpGet("GetCustomerAddresses")]
        public async Task<IActionResult> GetCustomerAddresses([FromQuery] CustomerAddressQueryDto customerAddressQueryDto)
        {
           var ListCustomerAddresses = await  _customerAddressService.GetCustomerAddresses(customerAddressQueryDto);
           return Ok(ListCustomerAddresses);
        }      

        [HttpPost(Name = "CreateCustomerAddress")]
        public async Task<IActionResult> CreateCustomer(CustomerAddressDto customerAddressDto)
        {
           await _customerAddressService.CreateCustomerAddress(customerAddressDto);
           return Ok();
        }

        [HttpPut(Name = "UpdateCustomerAddress")]
        public async Task<IActionResult> UpdateCustomerAddress(CustomerAddressDto customerAddressDto)
        {
            await _customerAddressService.UpdateCustomerAddress(customerAddressDto);
            return Ok();
        }
       
        [HttpDelete("{customerAddressId}", Name = "DeleteCustomerAddress")]
        public async Task<IActionResult> DeleteCustomerAddress(int customerAddressId)
        {
            await _customerAddressService.DeleteCustomerAddress(customerAddressId);
            return Ok();
        }
    }
}
