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

        public async Task<OrderDto> CreateOrder(OrderDto orderDto)
        {
            var itemOrder = await _orderRepository.GetOrderById(orderDto.Id);

            if (itemOrder != null) 
            {
                throw new InvalidOperationException("The order already exists");
            }

            var order = _mapper.Map<Order>(orderDto);
            
            _orderRepository.CreateOrder(order);
            await _orderRepository.Save();

            return _mapper.Map<OrderDto>(order);
        }

        public async Task DeleteOrder(int id)
        {
            var order = await _orderRepository.GetOrderById(id);

            if (order == null)
            {
                throw new InvalidOperationException($"The order with id {id} does not exist.");
            }

            _orderRepository.DeleteOrder(order);
            await _orderRepository.Save();
        }

        public async Task<ICollection<OrderDto>> GetOrders(OrderQueryDto orderQueryDto)
        {
            var listOrders = await _orderRepository.GetOrders(orderQueryDto);
            return _mapper.Map<List<OrderDto>>(listOrders);
        }        

        public async Task<OrderDto> UpdateOrder(OrderDto orderDto)
        {
            var order = await _orderRepository.GetOrderById(orderDto.Id);

            if (order == null)
            {
                throw new InvalidOperationException($"The order with id {orderDto.Id} does not exist.");
            }

            _mapper.Map(orderDto, order);
            await _orderRepository.Save();

            return _mapper.Map<OrderDto>(order);
        }
    }
}
