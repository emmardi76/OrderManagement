using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Controllers
{

    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [AllowAnonymous]
        [HttpGet("GetCustomers")]
        public async Task<IActionResult> GetCustomers([FromQuery] CustomerQueryDto customerQueryDto)
        {
            return Ok(await _customerService.GetCustomers(customerQueryDto));
        }

        
        [AllowAnonymous]
        [HttpGet("GetCustomerById/{id}")]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            var itemCustomer = await _customerService.GetCustomerById(id);

            if (itemCustomer == null)
            { 
                return NotFound();
            }

            return Ok(itemCustomer);

        }
        

        [AllowAnonymous]
        [HttpGet("GetCustomerAddressById/{id}")]
        public async Task<IActionResult> GetCustomerAddressById(int id)
        {
            var ListCustomerAddress = await _customerService.GetCustomerAddressById(id);

            if (ListCustomerAddress == null)
            {
                return NotFound();
            }

            return Ok(ListCustomerAddress);
        }

        [AllowAnonymous]
        [HttpGet("GetCustomerOrdersById/{id}")]
        public async Task<IActionResult> GetCustomerOrdersById(int id)
        {
            var ListCustomerOrders = await _customerService.GetCustomerOrdersById(id);

            if (ListCustomerOrders == null)
            {
                return NotFound();
            }

            return Ok(ListCustomerOrders);
        }

        
        [HttpPost(Name = "CreateCustomer")]
        public async Task<IActionResult> CreateCustomer(CustomerDto customerDto)
        {
            return Ok(await _customerService.CreateCustomer(customerDto));
        }

        [AllowAnonymous]
        [HttpPut(Name = "UpdateCustomer")]
        public async Task<IActionResult> UpdateCustomer([FromBody] CustomerDto customer)
        {
            await _customerService.UpdateCustomer(customer);

            return Ok(customer);
        }

        [AllowAnonymous]
        [HttpDelete("id", Name = "DeleteCustomer")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            await _customerService.DeleteCustomer(id);
            return Ok();
        }

    }
}
