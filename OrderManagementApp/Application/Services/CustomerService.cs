using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;
using OrderManagementApp.Persistence.Repository;

namespace OrderManagementApp.Application.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;

        public CustomerService(ICustomerRepository customerRepository, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
        }

        public async Task<CustomerDto> CreateCustomer(CustomerDto customerDto)
        {           
            var itemCustomer = await _customerRepository.GetCustomerById(customerDto.Id);

            if (itemCustomer != null)
            {
                throw new InvalidOperationException("The customer already exists");
            }

            var customer = _mapper.Map<Customer>(customerDto);
            _customerRepository.CreateCustomer(customer);
            await _customerRepository.Save();

            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task DeleteCustomer(int id)
        {
            var customer = await _customerRepository.GetCustomerById(id);
            if (customer == null)
            {
                throw new InvalidOperationException($"The customer with id {id} does not exist.");
            }
            _customerRepository.DeleteCustomerById(id);
            await _customerRepository.Save();
        }

        public async Task<ICollection<CustomerAddressDto>> GetCustomerAddressById(int id)
        {
            var ListCustomerAddress = await _customerRepository.GetCustomerAddressById(id);

            return _mapper.Map<ICollection<CustomerAddressDto>>(ListCustomerAddress);
            //var ListCustomerAddressDto = new List<CustomerAddressDto>();

            //if (ListCustomerAddress == null)// check it is needed 
            //{
            //    return null;
            //}

            //foreach (var List in ListCustomerAddress)
            //{
            //    ListCustomerAddressDto.Add(_mapper.Map<CustomerAddressDto>(List));
            //}

            //return ListCustomerAddressDto;
        }

        public async Task<CustomerDto> GetCustomerById(int id)
        {
            var itemCustomer = await _customerRepository.GetCustomerById(id);

            if (itemCustomer == null)
            {
                return null;
            }

            return _mapper.Map<CustomerDto>(itemCustomer);
        }

        public async Task<ICollection<OrderDto>> GetCustomerOrdersById(int id)
        {
            var ListCustomerOrder = await _customerRepository.GetCustomerOrdersById(id);

            return _mapper.Map<ICollection<OrderDto>>(ListCustomerOrder);
        }

        public async Task<ICollection<CustomerDto>> GetCustomers(CustomerQueryDto customerQueryDto)
        {
            var ListCustomers = await _customerRepository.GetCustomers(customerQueryDto);

            var ListCustomersDto = new List<CustomerDto>();

            foreach (var List in ListCustomers)
            {
                ListCustomersDto.Add(_mapper.Map<CustomerDto>(List));
            }

            return ListCustomersDto;
        }

        public async Task<ICollection<CustomerDto>> SearchCustomer(string param)
        {
            var customer = await _customerRepository.SearchCustomer(param);

            return _mapper.Map<ICollection<CustomerDto>>(customer);
        }

        public async Task<CustomerDto> UpdateCustomer(CustomerDto customerDto)
        {
            var customer = await _customerRepository.GetCustomerById(customerDto.Id); 

            if (customer == null)
            {
                throw new InvalidOperationException($"The customer with id {customerDto.Id} does not exist.");
            }
            _mapper.Map(customerDto, customer);
            await _customerRepository.Save();

            return _mapper.Map<CustomerDto>(customer);
        }
    }
}
