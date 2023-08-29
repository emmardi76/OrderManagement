using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface IOrderRepository
    {
        Task<ICollection<Order>> GetOrders(OrderQueryDto orderQueryDto);
        Task<Order> GetOrderById(int id);
        void CreateOrder(Order order);
        void UpdateOrder(Order order); 
        void DeleteOrder(Order order);
        Task<bool> Save();

        Task<ICollection<OrderLine>> GetOrderLines(int orderId);
        Task<ICollection<Order>> GetOrderByCustomerId(int customerId);
    }
}
