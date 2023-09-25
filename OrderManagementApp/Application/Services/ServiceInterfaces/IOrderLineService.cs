using OrderManagementApp.Application.Dtos;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface IOrderLineService
    {
        Task<ICollection<OrderLineDto>> GetOrderLines(OrderLineQueryDto orderLineQueryDto);
        Task CreateOrderLine(OrderLineDto orderLineDto);
        Task UpdateOrderLine(OrderLineDto orderLineDto);
        Task DeleteOrderLine(int orderLineId);
    }
}
