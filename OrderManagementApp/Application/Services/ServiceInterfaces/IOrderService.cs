using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrder(OrderDto orderDto);
        Task<ICollection<OrderDto>> GetOrders(OrderQueryDto orderQueryDto);
        Task<OrderDto> UpdateOrder(OrderDto orderDto);
        Task DeleteOrder(int id);
    }
}
