using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface ICustomerRepository
    {
        Task<ICollection<Customer>> GetCustomers(CustomerQueryDto customerQueryDto);
        Task<Customer> GetCustomerById(int id);
        Customer CreateCustomer(Customer customer);
        void UpdateCustomer(Customer customer);
        void DeleteCustomer(Customer customer);
        Task<bool> Save();
        Task<ICollection<CustomerAddress>> GetCustomerAddressById(int id);
        Task<ICollection<Order>> GetCustomerOrdersById(int id);
        Task<ICollection<Customer>> SearchCustomer(string? param);
    }
}