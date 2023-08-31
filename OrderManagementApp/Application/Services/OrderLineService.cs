using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

namespace OrderManagementApp.Application.Services
{
    public class OrderLineService : IOrderLineService
    {
        private readonly IOrderLineRepository _orderLineRepository;
        private readonly IMapper _mapper;

        public OrderLineService(IOrderLineRepository orderLineRepository, IMapper mapper)
        {
            _orderLineRepository = orderLineRepository;
            _mapper = mapper;
        }

        public async Task CreateOrderLine(OrderLineDto orderLineDto)
        {
            var orderLine = new OrderLine();
            _mapper.Map(orderLineDto, orderLine);
            _orderLineRepository.CreateOrderLine(orderLine);
            await _orderLineRepository.Save();
        }

        public async Task DeleteOrderLine(OrderLineDto orderLineDto)
        {
            var ListOrderLine = await _orderLineRepository.GetOrderLines(orderLineDto.OrderId);

            if (ListOrderLine.First(ol => ol.Id == orderLineDto.Id) == null)
            {
                throw new InvalidOperationException($"The orderLine with id {orderLineDto.Id} does not exist.");
            }

            _orderLineRepository.DeleteOrderLine(ListOrderLine.First(ol => ol.Id == orderLineDto.Id));
            await _orderLineRepository.Save();
        }

        public async Task<ICollection<OrderLineDto>> GetOrderLines(OrderLineQueryDto orderLineQueryDto)
        {
            var listOrderLines = await _orderLineRepository.GetOrderLines(orderLineQueryDto);

            return _mapper.Map<ICollection<OrderLineDto>>(listOrderLines);
        }

        public async Task UpdateOrderLine(OrderLineDto orderLineDto)
        {
            var listOrderLine = await _orderLineRepository.GetOrderLines(orderLineDto.OrderId);

            if (listOrderLine.First(ol => ol.Id == orderLineDto.Id) == null)
            {
                throw new InvalidOperationException($"The orderLine with id {orderLineDto.Id} does not exist.");
            }

            var orderline = new OrderLine();
            _mapper.Map(orderLineDto, orderline);
            await _orderLineRepository.Save();
        }
    }
}
