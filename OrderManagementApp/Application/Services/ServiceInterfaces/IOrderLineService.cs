using OrderManagementApp.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface IOrderLineService
    {
        Task<ICollection<OrderLineDto>> GetOrderLines(OrderLineQueryDto orderLineQueryDto);
        Task<ICollection<OrderLineDto>> GetOrderLinesByOrderId(int orderId);
        Task CreateOrderLine(OrderLineDto orderLineDto);
        Task UpdateOrderLine(OrderLineDto orderLineDto);
        Task DeleteOrderLine(OrderLineDto orderLineDto);
    }
}
