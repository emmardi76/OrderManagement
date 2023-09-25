using Microsoft.EntityFrameworkCore;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;
using System.Linq;

namespace OrderManagementApp.Persistence.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly OrderContext _orderContext;


        public OrderRepository(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }

        public void CreateOrder(Order order)
        {
            _orderContext.Orders.Add(order);
        }

        public void DeleteOrder(Order order)
        {
            _orderContext.Orders.Remove(order);
        }

        public async Task<ICollection<Order>> GetOrderByCustomerId(int customerId)
        {
            return await _orderContext.Orders.Where(o => o.CustomerId == customerId).ToListAsync();
        }

        public async Task<Order?> GetOrderById(int id)
        {
            return await _orderContext.Orders.FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<Order?> GetOrderWithLinesByOrderId(int id)
        {
            return await _orderContext
                            .Orders
                            .Include(o => o.OrderLines)
                            .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<ICollection<OrderLine>> GetOrderLines(int orderId)
        {
            return await _orderContext.OrderLines.Where(ol => ol.OrderId == orderId).ToListAsync();
        }

        public async Task<ICollection<Order>> GetOrders(OrderQueryDto? orderQueryDto = null)
        {
            var orders = _orderContext.Orders.AsQueryable<Order>();

            if (orderQueryDto != null)
            {
                if (orderQueryDto.Id.HasValue)
                {
                    orders = orders.Where(o => o.Id == orderQueryDto.Id.Value);
                }

                if (orderQueryDto.CustomerId.HasValue)
                {
                    orders = orders.Where(o => o.CustomerId == orderQueryDto.CustomerId.Value);
                }

                if (orderQueryDto.CustomerAddressId.HasValue)
                {
                    orders = orders.Where(o => o.CustomerAddressId == orderQueryDto.CustomerAddressId.Value);
                }

                if (orderQueryDto.Date.HasValue)
                {
                    orders = orders.Where(o => o.Date == orderQueryDto.Date.Value);
                }

                if (orderQueryDto.OrderNumber is not null)
                {
                    orders = orders.Where(o => o.OrderNumber != null && orderQueryDto.OrderNumber.Contains(orderQueryDto.OrderNumber));
                }

                if (orderQueryDto.Remarks is not null)
                {
                    orders = orders.Where(o => o.Remarks != null && orderQueryDto.Remarks.Contains(orderQueryDto.Remarks));
                }

                if (orderQueryDto.Total.HasValue)
                {
                    orders = orders.Where(o => o.Total == orderQueryDto.Total.Value);
                }

                if (orderQueryDto.TotalTaxes.HasValue)
                {
                    orders = orders.Where(o => o.TotalTaxes.Equals(orderQueryDto.TotalTaxes));
                }
            }

            return await orders.OrderBy(o => o.Id).ToListAsync();
        }

        public async Task<bool> Save()
        {
            return await _orderContext.SaveChangesAsync() >= 0 ? true : false;
        }

        public void UpdateOrder(Order order)
        {
            _orderContext.Orders.Update(order);
        }
    }
}
