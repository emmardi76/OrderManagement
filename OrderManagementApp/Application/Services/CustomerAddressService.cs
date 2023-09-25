using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;
using OrderManagementApp.Persistence.Repository;

namespace OrderManagementApp.Application.Services
{
    public class CustomerAddressService : ICustomerAddressService
    {
        private readonly ICustomerAddressRepository _customerAddressRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public CustomerAddressService(ICustomerAddressRepository customerAddressRepository, IOrderRepository orderRepository, IMapper mapper)
        {
            _customerAddressRepository = customerAddressRepository;
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task CreateCustomerAddress(CustomerAddressDto customerAddressDto)
        {
            var customerAddress = new CustomerAddress();
            _mapper.Map(customerAddressDto, customerAddress);
            _customerAddressRepository.CreateCustomerAddress(customerAddress);
            await _customerAddressRepository.Save();
        }

        public async Task DeleteCustomerAddress(int customerAddressId)
        {
            var orderQueryDto = new OrderQueryDto() { CustomerAddressId = customerAddressId };
            var orders = await _orderRepository.GetOrders(orderQueryDto);

            if (orders.Any()) 
            {
                throw new InvalidOperationException($"The address cannot be removed because it is used by some orders, at least order id {orders.First().Id}");
            }
            var customerAddress = await GetCustomerAddressById(customerAddressId);

            _customerAddressRepository.DeleteCustomerAddress(customerAddress);
            await _customerAddressRepository.Save();
        }

        public async Task<ICollection<CustomerAddressDto>> GetCustomerAddresses(CustomerAddressQueryDto customerAddressQueryDto)
        {
            var listCustomerAddresses = await _customerAddressRepository.GetCustomerAddresses(customerAddressQueryDto);

            var ListCustomerAddressesDto = new List<CustomerAddressDto>();

            foreach (var List in listCustomerAddresses)
            {
                ListCustomerAddressesDto.Add(_mapper.Map<CustomerAddressDto>(List));
            }
            return _mapper.Map<ICollection<CustomerAddressDto>>(ListCustomerAddressesDto);
        }

        public async Task<ICollection<CustomerAddressDto>> GetCustomerAddressesByCustomerId(int customerId)
        {
            var listCustomerAddress = await _customerAddressRepository.GetCustomerAddressesByCustomerId(customerId);
            return _mapper.Map<ICollection<CustomerAddressDto>>(listCustomerAddress);
        }

        public async Task UpdateCustomerAddress(CustomerAddressDto customerAddressDto)
        {
            var customerAddress = await GetCustomerAddressById(customerAddressDto.Id);

            _mapper.Map(customerAddressDto, customerAddress);

            //_customerAddressRepository.UpdateCustomerAddress(customerAddress);
            await _customerAddressRepository.Save();
        }

        private async Task<CustomerAddress> GetCustomerAddressById(int customerAddressId)
        {
            var customerAddress = await _customerAddressRepository.GetCustomerAddressById(customerAddressId);
            if (customerAddress == null)
            {
                throw new InvalidOperationException($"The customerAddress with id {customerAddressId} does not exist.");
            }
            return customerAddress;
        }
    }
}
