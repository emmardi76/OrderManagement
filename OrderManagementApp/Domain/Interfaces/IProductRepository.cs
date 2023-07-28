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
        ICollection<Product> GetProducts();
        Product GetProductById(int id);
        bool ExistProduct(int Id);
        bool ExistProduct(string name);
        Product CreateProduct(Product product);
        bool UpdateProduct(Product product);
        bool DeleteProduct(Product Product);
        bool Save();

        TaxType GetTaxTypeForProductByProductId(int Id);
        ICollection<OrderLine> GetProductInOrderLines(int Id);
    }
}
