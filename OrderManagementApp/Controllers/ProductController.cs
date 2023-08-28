using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;

namespace OrderManagementApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProductController: Controller
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [AllowAnonymous]
        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProducts([FromQuery] ProductQueryDto productQueryDto)
        {
            return Ok(await _productService.GetProducts(productQueryDto));
        }

        [AllowAnonymous]
        [HttpGet("GetProductsById/{id}")]
        public async Task<IActionResult> GetProductsById(int id)
        {
            var itemProduct = await _productService.GetProductById(id);

            if (itemProduct == null)
            {
                return NotFound();
            }

            return Ok(itemProduct);

        }

        [HttpPost(Name = "CreateProduct")]
        public async Task<IActionResult> CreateProduct(ProductDto productDto)
        {
            return Ok(await _productService.CreateProduct(productDto));
        }

        [HttpPut(Name = "UpdateProduct")]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductDto productDto)
        {
            await _productService.UpdateProduct(productDto);

            return Ok(productDto);
        }

        [HttpDelete("id", Name = "DeleteProduct")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _productService.DeleteProduct(id);
            return Ok();
        }
    }
}
