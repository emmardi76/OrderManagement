using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface IProductRepository
    {
        Task<ICollection<Product>> GetProducts(ProductQueryDto productQueryDto);
        Task<Product> GetProductById(int id);
        void CreateProduct(Product product);
        void UpdateProduct(Product product);
        void DeleteProduct(Product product);
        Task<bool> Save();

        Task<TaxType> GetTaxTypeForProductByProductId(int Id);
        Task<ICollection<Product>> SearchProduct(string? param);
        //Task<ICollection<OrderLine>> GetProductInOrderLines(int Id);
    }
}
