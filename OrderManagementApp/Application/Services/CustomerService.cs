using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public CustomerDto CreateCustomer(CustomerDto customerDto)
        {           
            var itemCustomer = _customerRepository.GetCustomerById(customerDto.Id);

            if (itemCustomer != null)
            {
                throw new InvalidOperationException("The customer already exists");
            }

            var customer = _mapper.Map<Customer>(customerDto);
            _customerRepository.CreateCustomer(customer);

            return _mapper.Map<CustomerDto>(customer);
        }

        public void DeleteCustomer(int id)
        {
            throw new NotImplementedException();
        }

        public ICollection<CustomerAddressDto> GetCustomerAddressById(int id)
        {
            var ListCustomerAddress = _customerRepository.GetCustomerAddressById(id);

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

        public CustomerDto GetCustomerById(int id)
        {
            var itemCustomer = _customerRepository.GetCustomerById(id);

            if (itemCustomer == null)
            {
                return null;
            }

            return _mapper.Map<CustomerDto>(itemCustomer);
        }

        public ICollection<OrderDto> GetCustomerOrdersById(int id)
        {
            throw new NotImplementedException();
        }

        public ICollection<CustomerDto> GetCustomers()
        {
            var ListCustomers = _customerRepository.GetCustomers();

            var ListCustomersDto = new List<CustomerDto>();

            foreach (var List in ListCustomers)
            {
                ListCustomersDto.Add(_mapper.Map<CustomerDto>(List));
            }

            return ListCustomersDto;
        }

        public bool Save()
        {
            return _customerRepository.Save();
        }

        public bool UpdateCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }
    }
}
