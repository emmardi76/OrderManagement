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
        ICollection<OrderLine> GetOrderLines(int orderId);
        OrderLine CreateOrderLines(OrderLine orderLine, int orderId);
        bool UpdateOrderLines(OrderLine orderLine, int orderId);
        bool DeleteOrderLines(int orderId);
        bool Save();

        Product GetProductinOrderLine(int productId,int orderId,int Id);
        TaxType GetTaxTypeinOrderLine(int orderId, int Id);
        Order GetOrderByOrderLineId(int Id);
    }
}
