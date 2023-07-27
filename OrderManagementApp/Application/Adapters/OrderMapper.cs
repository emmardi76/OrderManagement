using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;


namespace OrderManagementApp.Application.Adapters
{
    public class OrderMapper: Profile
    {
        public OrderMapper()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Customer, CustomerDto>().ReverseMap();         
            CreateMap<CustomerAddress, CustomerAddressDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<OrderLine, OrderLineDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<TaxType,TaxTypeDto>().ReverseMap();
        }
    }
}
