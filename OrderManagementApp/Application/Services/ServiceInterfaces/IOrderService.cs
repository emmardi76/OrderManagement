using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrder(OrderDto orderDto);
        Task<ICollection<OrderDto>> GetAllOrders(OrderQueryDto orderQueryDto);
        Task<OrderDto>GetOrdersById(int id);
        Task<OrderDto> UpdateOrder(OrderDto orderDto);
        Task DeleteOrder(int id);
        Task<ICollection<OrderLine>> GetOrderLines(int orderId);
        Task<ICollection<Order>> GetOrderByCustomerId(int customerId);
    }
}
