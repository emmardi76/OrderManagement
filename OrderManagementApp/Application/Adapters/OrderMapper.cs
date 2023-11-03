using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;


namespace OrderManagementApp.Application.Adapters
{
    public class OrderMapper : Profile
    {
        public OrderMapper()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, RegisterUserDto>().ReverseMap();
            CreateMap<User, UserAuthDto>().ReverseMap();
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<CustomerAddress, CustomerAddressDto>().ReverseMap();
            CreateMap<Order, OrderDto>()
                     .AfterMap((source, dest) =>
                     {
                         dest.CustomerName = source.Customer?.FirstName + " " + source.Customer?.LastName;
                     });
            CreateMap<OrderDto, Order>();
            CreateMap<OrderUpdateDto, Order>();
            CreateMap<Order, OrderListDto>()
                .AfterMap((source, dest) =>
                {
                    dest.CustomerName = source.Customer?.FirstName + " " + source.Customer?.LastName;
                });
            CreateMap<OrderLine, OrderLineDto>().ReverseMap();
            CreateMap<Product, ProductDto>()
                .AfterMap((source, dest) =>
                {
                    if (source.TaxType is not null)
                    {
                        dest.TaxPercentage = source.TaxType.TaxPercentage;
                    }
                });
            
            CreateMap<ProductDto, Product>();
            CreateMap<TaxType, TaxTypeDto>().ReverseMap();
        }
    }
}
