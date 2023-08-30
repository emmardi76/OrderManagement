﻿using Microsoft.EntityFrameworkCore;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;
using System.Linq;

namespace OrderManagementApp.Persistence.Repository
{
    public class OrderLineRepository : IOrderLineRepository
    {
        private readonly OrderContext _orderContext;

        public OrderLineRepository(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }

        public void CreateOrderLine(OrderLine orderLine)
        {
            _orderContext.OrderLines.Add(orderLine);
        }

        public void DeleteOrderLine(OrderLine orderLine)
        {
            _orderContext.OrderLines.Remove(orderLine);
        }

        public Task<Order> GetOrderByOrderIdinOrderLine(int orderId)
        {
            return Task.FromResult((Order)_orderContext.Orders.Where(o => o.Id == orderId));
        }

        public async Task<ICollection<OrderLine>> GetOrderLines(int orderId)
        {
            return await _orderContext.OrderLines.Where(ol =>ol.OrderId == orderId).ToListAsync();
        }

        public async Task<ICollection<OrderLine>> GetOrderLines(OrderLineQueryDto orderLineQueryDto=null)
        {
            var orderLines = _orderContext.OrderLines.AsQueryable<OrderLine>();

            if (orderLineQueryDto != null)
            {
                if (orderLineQueryDto.Id.HasValue)
                {
                    orderLines = orderLines.Where(ol => ol.Id == orderLineQueryDto.Id.Value);
                }

                if (orderLineQueryDto.OrderId.HasValue)
                {
                    orderLines = orderLines.Where(ol => ol.OrderId == orderLineQueryDto.OrderId.Value);
                }

                if (orderLineQueryDto.TaxTypeId.HasValue)
                {
                    orderLines = orderLines.Where(ol => ol.TaxTypeId == orderLineQueryDto.TaxTypeId.Value);
                }

                if (orderLineQueryDto.Total != 0)
                {
                    orderLines = orderLines.Where(ol => ol.Total.Equals(orderLineQueryDto.Total));
                }                
            }

            return await _orderContext.OrderLines.OrderBy(ol => ol.OrderId).ToListAsync();
        }
        /*
        public Task<Product> GetProductinOrderLine(int productId, int orderId, int Id)
        {
            return Task.FromResult(result: (Product)_orderContext.OrderLines.Where(ol => ol.ProductId == productId));
        }

        public Task<TaxType> GetTaxTypeinOrderLine(int orderId, int Id)
        {
            throw new NotImplementedException();
        }
        */

        public async Task<bool> Save()
        {
            return await _orderContext.SaveChangesAsync() >= 0 ? true : false;
        }

        public void UpdateOrderLine(OrderLine orderLine)
        {
            _orderContext.OrderLines.Update(orderLine);
        }
    }
}