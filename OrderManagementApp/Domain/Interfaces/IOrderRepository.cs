using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface IOrderRepository
    {
        Task<ICollection<Order>> GetOrders(OrderQueryDto orderQueryDto);
        Task<Order?> GetOrderById(int id);
        Task<Order?> GetOrderWithLinesByOrderId(int id);
        void CreateOrder(Order order);
        void UpdateOrder(Order order); 
        void DeleteOrder(Order order);
        Task<bool> Save();

        Task<ICollection<OrderLine>> GetOrderLines(int orderId);
        Task<ICollection<Order>> GetOrderByCustomerId(int customerId);
    }
}
