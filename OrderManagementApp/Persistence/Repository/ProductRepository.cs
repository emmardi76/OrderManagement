using Microsoft.EntityFrameworkCore;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

namespace OrderManagementApp.Persistence.Repository
{
    public class ProductRepository: IProductRepository
    {
        private readonly OrderContext _orderContext;

        public ProductRepository(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }

        public void CreateProduct(Product product)
        {
            _orderContext.Products.Add(product);
        }

        public void DeleteProduct(Product product)
        {        
            _orderContext.Products.Remove(product);
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _orderContext.Products.FirstOrDefaultAsync(t => t.Id == id);
        }

        /*
        public async Task<ICollection<OrderLine>> GetProductInOrderLines(int Id)
        {
            throw new NotImplementedException();
        }
        */

        public async Task<ICollection<Product>> SearchProduct(string? param)
        {
            var product = _orderContext.Products.AsQueryable<Product>();

            if (!string.IsNullOrEmpty(param))
            {
                if (param != null)
                {
                    product = product.Where(p => p.Name != null &&  p.Name.Contains(param));
                }                
            }

            return await product.OrderBy(p => p.Name).ToListAsync();

        }

        public async Task<ICollection<Product>> GetProducts(ProductQueryDto productQueryDto)
        {
            var products = _orderContext.Products.AsQueryable<Product>();

            if (productQueryDto != null)
            {
                if (productQueryDto.Id.HasValue)
                {
                    products = products.Where(p => p.Id == productQueryDto.Id.Value);
                }

                if (productQueryDto.Name is not null)
                {
                    products = products.Where(p=> p.Name != null && p.Name.Contains(productQueryDto.Name));
                }

                if (productQueryDto.Description is not null)
                {
                    products = products.Where(p => p.Description != null && p.Description.Contains(productQueryDto.Description));
                }

                if (productQueryDto.UnitPrice != 0)
                {
                    products = products.Where(p => p.UnitPrice.Equals(productQueryDto.UnitPrice));
                }
                
            }

            return await products.Include(p => p.TaxType).OrderBy(t => t.Name).ToListAsync();
        }

        public Task<TaxType> GetTaxTypeForProductByProductId(int Id)
        {
            IQueryable<Product> tax = _orderContext.Products.Where(p => p.TaxTypeId != 0 && p.Id == Id);
            return Task.FromResult((TaxType)tax);

        }

        public async  Task<bool> Save()
        {
            return await _orderContext.SaveChangesAsync() >= 0 ? true : false;
        }

        public void UpdateProduct(Product product)
        {
            _orderContext.Set<Product>().Update(product);
        }
    }
}
