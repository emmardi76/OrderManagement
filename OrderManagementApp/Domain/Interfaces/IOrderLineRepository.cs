using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface IOrderLineRepository
    {
        Task<ICollection<OrderLine>> GetOrderLines(int orderId);
        Task<OrderLine?> GetOrderLineById(int orderLineId);
        void CreateOrderLine(OrderLine orderLine);
        void UpdateOrderLine(OrderLine orderLine);
        void DeleteOrderLine(OrderLine orderLine);
        Task<bool> Save();
        Task<ICollection<OrderLine>> GetOrderLines(OrderLineQueryDto? orderLineQueryDto = null);
    }
}
