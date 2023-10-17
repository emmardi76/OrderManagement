using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;
using OrderManagementApp.Persistence.Repository;

namespace OrderManagementApp.Application.Services
{
    public class OrderLineService : IOrderLineService
    {
        private readonly IOrderLineRepository _orderLineRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderLineService(IOrderLineRepository orderLineRepository, IOrderRepository orderRepository, IOrderService orderService, IMapper mapper)
        {
            _orderLineRepository = orderLineRepository;
            _orderRepository = orderRepository;
            _orderService = orderService;
            _mapper = mapper;
        }

        public async Task CreateOrderLine(OrderLineDto orderLineDto)
        {
            // 1.-Obtener el pedido con sus lineas para operar con él.
            var order = await _orderRepository.GetOrderWithLinesByOrderId(orderLineDto.OrderId);
            if (order == null) 
            {
                throw new InvalidOperationException($"The order {orderLineDto.OrderId} does not exist.");
            }

            // 2.-Operar con la línea, en este caso crearla y asignarla al pedido.
            var orderLine = new OrderLine();           
            _mapper.Map(orderLineDto, orderLine);
            orderLine.TotalWithoutTaxes = Math.Round(orderLine.Quantity * orderLine.UnitPrice, 2);
            orderLine.TotalTaxes = Math.Round(orderLine.TotalWithoutTaxes * (orderLine.TaxPercentage / 100), 2);
            orderLine.Total = Math.Round(orderLine.TotalWithoutTaxes + orderLine.TotalTaxes, 2);
            order.OrderLines.Add(orderLine);

            // 3.-Llamar a la función que modifica el pedido calculando los totales.
            _orderService.SetOrderTotals(order);

            // 4.-Realizar el guardado (Save del repositorio.)
            await _orderLineRepository.Save();
        }

        public async Task DeleteOrderLine(int orderLineId)
        {
            var orderLine = await GetOrderLineById(orderLineId);

            var order = await _orderRepository.GetOrderWithLinesByOrderId(orderLine.OrderId);

            if (order == null)
            {
                throw new InvalidOperationException($"The order {orderLine.OrderId} does not exist.");
            }
          
            order.OrderLines.Remove(orderLine);

            _orderService.SetOrderTotals(order);

            await _orderLineRepository.Save();
        }

        public async Task<ICollection<OrderLineDto>> GetOrderLines(OrderLineQueryDto orderLineQueryDto)
        {
            var listOrderLines = await _orderLineRepository.GetOrderLines(orderLineQueryDto);

            return _mapper.Map<ICollection<OrderLineDto>>(listOrderLines);
        }

        public async Task UpdateOrderLine(OrderLineDto orderLineDto)
        {
            var order = await _orderRepository.GetOrderWithLinesByOrderId(orderLineDto.OrderId);

            if (order == null)
            {
                throw new InvalidOperationException($"The order {orderLineDto.OrderId} does not exist.");
            }

            var orderLine = order.OrderLines.FirstOrDefault(x => x.Id == orderLineDto.Id);
            if (orderLine == null) 
            {
                throw new InvalidOperationException($"The order line {orderLineDto.Id} does not exist.");
            }

            _mapper.Map(orderLineDto, orderLine);

            orderLine.TotalWithoutTaxes = Math.Round(orderLine.Quantity * orderLine.UnitPrice, 2);
            orderLine.TotalTaxes = Math.Round(orderLine.TotalWithoutTaxes * (orderLine.TaxPercentage / 100), 2);
            orderLine.Total = Math.Round(orderLine.TotalWithoutTaxes + orderLine.TotalTaxes, 2);


            _orderService.SetOrderTotals(order);

            await _orderLineRepository.Save();
        }

        private async Task<OrderLine> GetOrderLineById(int orderLineId)
        {
            var orderLine = await _orderLineRepository.GetOrderLineById(orderLineId);
            if (orderLine == null)
            {
                throw new InvalidOperationException($"The orderLine with id {orderLineId} does not exist.");
            }
            return orderLine;
        }

    }
}
