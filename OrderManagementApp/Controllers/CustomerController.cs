using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;

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
