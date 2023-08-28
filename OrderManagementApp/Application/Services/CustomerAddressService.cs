using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

namespace OrderManagementApp.Application.Services
{
    public class CustomerAddressService : ICustomerAddressService
    {
        private readonly ICustomerAddressRepository _customerAddressRepository;
        private readonly IMapper _mapper;

        public CustomerAddressService(ICustomerAddressRepository customerAddressRepository, IMapper mapper)
        {
            _customerAddressRepository = customerAddressRepository;
            _mapper = mapper;
        }

        public async Task CreateCustomerAddress(CustomerAddressDto customerAddressDto)
        {      
                var customerAddress = new CustomerAddress();                
                _mapper.Map(customerAddressDto, customerAddress);
                _customerAddressRepository.CreateCustomerAddress(customerAddress);
                await _customerAddressRepository.Save();                 
        }

        public async Task DeleteCustomerAddress(CustomerAddressDto customerAddressDto)
        {
            var ListCustomerAddress = await _customerAddressRepository.GetCustomerAddressesByCustomerId(customerAddressDto.CustomerId);
                        
            if (ListCustomerAddress.First(ca => ca.Id == customerAddressDto.Id) == null)
            {
                throw new InvalidOperationException($"The customerAddress with id {customerAddressDto.Id} does not exist.");
            }
            _customerAddressRepository.DeleteCustomerAddress(ListCustomerAddress.First(ca => ca.Id == customerAddressDto.Id));
            await _customerAddressRepository.Save();
        }

        public async  Task<ICollection<CustomerAddressDto>> GetCustomerAddresses(CustomerAddressQueryDto customerAddressQueryDto)
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
            var ListCustomerAddress = await _customerAddressRepository.GetCustomerAddressesByCustomerId(customerAddressDto.CustomerId);

            if (ListCustomerAddress.First(ca => ca.Id == customerAddressDto.Id) == null)
            {
                throw new InvalidOperationException($"The customerAddress with id {customerAddressDto.Id} does not exist.");
            }

            var customerAddress = new CustomerAddress();
            _mapper.Map(customerAddressDto, customerAddress);
            //_customerAddressRepository.UpdateCustomerAddress(customerAddress);
            await _customerAddressRepository.Save();
        }
    }
}
