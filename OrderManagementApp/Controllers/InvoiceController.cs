using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;

namespace OrderManagementApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class InvoiceController: Controller
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpGet("GetInvoices")]
        public async Task<IActionResult> GetInvoices([FromQuery] InvoiceQueryDto invoiceQueryDto)
        {
            return Ok(await _invoiceService.GetInvoices(invoiceQueryDto));
        }

        [HttpGet("GetInvoice/{id}")]
        public async Task<ActionResult<InvoiceDto>> GetInvoice(int id)
        { 
            return Ok(await _invoiceService.GetInvoice(id));
        }

        [HttpPost(Name = "CreateInvoice")]
        public async Task<IActionResult> CreateInvoice(InvoiceDto invoiceDto)
        {
            return Ok(await _invoiceService.CreateInvoice(invoiceDto));
        }

        [AllowAnonymous]
        [HttpPut(Name = "UpdateInvoice")]
        public async Task<IActionResult> UpdateInvoice(InvoiceUpdateDto invoiceDto)
        {
            return Ok(await _invoiceService.UpdateInvoice(invoiceDto));
        }

        [AllowAnonymous]
        [HttpDelete("{id}", Name = "DeleteInvoice")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            await _invoiceService.DeleteInvoice(id);
            return Ok();
        }
    }
}
