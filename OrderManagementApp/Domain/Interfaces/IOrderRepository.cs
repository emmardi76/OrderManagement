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
        ICollection<Order> GetOrders();
        Order GetOrderById(int id);
        Order CreateOrder(Order order);
        bool UpdateOrder(Order order); 
        bool DeleteOrder(int id);
        bool Save();

        ICollection<OrderLine> GetOrderLines(int orderId);
        ICollection<Order> GetOrderByCustomerId(int customerId);
    }
}
