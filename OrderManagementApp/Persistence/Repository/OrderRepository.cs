using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Persistence.Repository
{
    public class OrderRepository : IOrderRepository
    {
        public Order CreateOrder(Order order)
        {
            throw new NotImplementedException();
        }

        public bool DeleteOrder(int id)
        {
            throw new NotImplementedException();
        }

        public ICollection<Order> GetOrderByCustomerId(int customerId)
        {
            throw new NotImplementedException();
        }

        public Order GetOrderById(int id)
        {
            throw new NotImplementedException();
        }

        public ICollection<OrderLine> GetOrderLines(int orderId)
        {
            throw new NotImplementedException();
        }

        public ICollection<Order> GetOrders()
        {
            throw new NotImplementedException();
        }

        public bool Save()
        {
            throw new NotImplementedException();
        }

        public bool UpdateOrder(Order order)
        {
            throw new NotImplementedException();
        }
    }
}
