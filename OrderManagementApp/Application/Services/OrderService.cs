using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

namespace OrderManagementApp.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        public OrderService(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public Task<OrderDto> CreateOrder(OrderDto orderDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteOrder(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<OrderDto>> GetAllOrders(OrderQueryDto orderQueryDto)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<Order>> GetOrderByCustomerId(int customerId)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<OrderLine>> GetOrderLines(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<OrderDto> GetOrdersById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<OrderDto> UpdateOrder(OrderDto orderDto)
        {
            throw new NotImplementedException();
        }
    }
}
