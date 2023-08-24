using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;

namespace OrderManagementApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TaxTypeController: Controller
    {
        private readonly ITaxTypeService _taxTypeService;

        public TaxTypeController(ITaxTypeService taxTypeService) 
        {
            _taxTypeService = taxTypeService;
        }

        [AllowAnonymous]
        [HttpGet("GetTaxes")]
        public async Task<IActionResult> GetTaxes([FromQuery] TaxQueryDto taxQueryDto)
        {
            return Ok(await _taxTypeService.GetTaxes(taxQueryDto));
        }

        [HttpPost(Name = "CreateTax")]
        public async Task<IActionResult> CreateTax(TaxTypeDto taxesDto)
        {
            return Ok(await _taxTypeService.CreateTax(taxesDto));
        }

        [HttpPut(Name = "UpdateTax")]
        public async Task<IActionResult> UpdateTax([FromBody] TaxTypeDto taxesDto)
        {
            await _taxTypeService.UpdateTax(taxesDto);

            return Ok(taxesDto);
        }

        [HttpDelete("id", Name = "DeleteTax")]
        public async Task<IActionResult> DeleteTax(int id)
        {
            await _taxTypeService.DeleteTax(id);
            return Ok();
        }
    }
}
