using OrderManagementApp.Application.Dtos;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface IProductService
    {
        Task<ICollection<ProductDto>>GetProducts(ProductQueryDto productQueryDto);
        Task<ProductDto> GetProductById(int id);
        Task<ProductDto> CreateProduct(ProductDto productDto);
        Task<ProductDto> UpdateProduct(ProductDto productDto);
        Task DeleteProduct(int id);
    }
}
