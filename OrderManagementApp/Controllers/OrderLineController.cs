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
    public class OrderLineController: Controller
    {
        private readonly IOrderLineService _orderLineService;

        public OrderLineController(IOrderLineService orderLineService)
        { 
            _orderLineService = orderLineService;
        }

        [AllowAnonymous]
        [HttpGet("GetOrderLines")]
        public async Task<IActionResult> GetOrderLines([FromQuery]OrderLineQueryDto orderLineQueryDto)
        {
            var listOrderLines = await _orderLineService.GetOrderLines(orderLineQueryDto);
            return Ok(listOrderLines);
        }

        [AllowAnonymous]
        [HttpGet("GetOrderLinesByOrderId/{orderId}")]
        public async Task<IActionResult> GetOrderLinesByOrderId(int orderId)
        {
            var listOrderLines = await _orderLineService.GetOrderLinesByOrderId(orderId);
            return Ok(listOrderLines);
        }

        [HttpPost(Name = "CreateOrderLine")]
        public async Task<IActionResult> CreateOrderLine(OrderLineDto orderLineDto)
        { 
            await _orderLineService.CreateOrderLine(orderLineDto);
            return Ok();
        }

        [HttpPut(Name = "UpdateOrderLine")]
        public async Task<IActionResult> UpdateOrderLine(OrderLineDto orderLineDto)
        {
            await _orderLineService.UpdateOrderLine(orderLineDto);
            return Ok();
        }

        [HttpDelete(Name = "DeleteOrderLine")]
        public async Task<IActionResult> DeleteOrderLine(OrderLineDto orderLineDto)
        {
            await _orderLineService.DeleteOrderLine(orderLineDto);
            return Ok();
        }
    }
}
