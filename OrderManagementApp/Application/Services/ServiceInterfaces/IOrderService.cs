using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrder(OrderDto orderDto);
        Task<ICollection<OrderListDto>> GetOrders(OrderQueryDto orderQueryDto);
        Task<OrderDto> UpdateOrder(OrderUpdateDto orderDto);
        Task DeleteOrder(int id);
        void SetOrderTotals(Order order);
        Task<OrderDto> GetOrder(int id);
    }
}
