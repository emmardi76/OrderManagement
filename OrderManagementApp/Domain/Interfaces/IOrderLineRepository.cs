using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface IOrderLineRepository
    {
        Task<ICollection<OrderLine>> GetOrderLines(int orderId);
        void CreateOrderLine(OrderLine orderLine);
        void UpdateOrderLine(OrderLine orderLine);
        void DeleteOrderLine(OrderLine orderLine);
        Task<bool> Save();

        //Task<Product> GetProductinOrderLine(int productId,int orderId,int Id);
        //Task<TaxType> GetTaxTypeinOrderLine(int orderId, int Id);
        Task<Order> GetOrderByOrderIdinOrderLine(int orderId);
        Task<ICollection<OrderLine>> GetOrderLines(OrderLineQueryDto orderLineQueryDto);
    }
}
