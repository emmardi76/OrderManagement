using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;
using OrderManagementApp.Persistence.Repository;

namespace OrderManagementApp.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository ;
        private readonly IMapper _mapper ;

        public ProductService(IProductRepository productRepository, IMapper mapper )
        {
            _productRepository = productRepository ;
            _mapper = mapper ;
        }

        public async Task<ProductDto> CreateProduct(ProductDto productDto)
        {
            var itemproduct = await _productRepository.GetProductById( productDto.Id );

            if (itemproduct != null )
            {
                throw new InvalidOperationException("The product already exists");
            }

            var product = _mapper.Map<Product>(productDto);
            _productRepository.CreateProduct(product);
            await _productRepository.Save();

            return _mapper.Map<ProductDto>(product);

        }

        public async Task DeleteProduct(int id)
        {
            var product = await _productRepository.GetProductById(id);

            if(product == null)
            {
                throw new InvalidOperationException($"The product with id {id} does not exist.");
            }

            _productRepository.DeleteProduct(product);

            await _productRepository.Save();
        }

        public async Task<ICollection<ProductDto>> GetProducts(ProductQueryDto productQueryDto)
        {
            var ListProducts = await _productRepository.GetProducts(productQueryDto);
            return _mapper.Map<List<ProductDto>>(ListProducts);
        }

        public async Task<ProductDto> GetProductById(int id)
        {
            var itemProduct = await _productRepository.GetProductById(id);           

            return _mapper.Map<ProductDto>(itemProduct);
        }

        public async Task<ICollection<ProductDto>> SearchProduct(string param)
        {
            var product = await _productRepository.SearchProduct(param);

            return _mapper.Map<ICollection<ProductDto>>(product);
        }

        public async Task<ProductDto> UpdateProduct(ProductDto productDto)
        {
            var product = await _productRepository.GetProductById(productDto.Id);

            if(product == null)
            {
                throw new InvalidOperationException($"The product with id {productDto.Id} does not exist.");
            }

            _mapper.Map(productDto,product);
            await _productRepository.Save();

            return _mapper.Map<ProductDto>(product);
        }
    }
}
