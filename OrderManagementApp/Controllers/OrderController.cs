using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderManagementApp.Application.Dtos;
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
    public class OrderController: Controller
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [AllowAnonymous]
        [HttpGet("GetOrders")]
        public async Task<IActionResult> GetOrders([FromQuery] OrderQueryDto orderQueryDto)
        {
            return Ok(await _orderService.GetOrders(orderQueryDto));
        }

        [HttpPost(Name = "CreateOrder")]
        public async Task<IActionResult> CreateOrder(OrderDto orderDto)
        {
            return Ok(await _orderService.CreateOrder(orderDto));
        }

        [AllowAnonymous]
        [HttpPut(Name = "UpdateOrder")]
        public async Task<IActionResult> UpdateOrder([FromBody] OrderDto orderDto)
        {
            return Ok(await _orderService.UpdateOrder(orderDto));
        }

        [AllowAnonymous]
        [HttpDelete("id", Name = "DeleteOrder")]
        public async Task<IActionResult> DeleteOrder(int id)
        { 
            await _orderService.DeleteOrder(id);
            return Ok();
        }
    }
}
