using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;

namespace OrderManagementApp.Controllers
{

    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class InvoiceLineController: Controller
    {
        private readonly IInvoiceLineService _invoiceLineService;

        public InvoiceLineController(IInvoiceLineService invoiceLineService)
        {
            _invoiceLineService = invoiceLineService;
        }


        [AllowAnonymous]
        [HttpGet("GetInvoiceLines")]
        public async Task<IActionResult> GetInvoicelines([FromQuery]InvoiceLineQueryDto invoiceLineQueryDto)
        {
            var listInvoiceLines = await _invoiceLineService.GetInvoiceLines(invoiceLineQueryDto);
            return Ok(listInvoiceLines);
        }

        [HttpPost(Name = "CreateInvoiceLine")]
        public async Task<IActionResult> CreateInvoiceLine(InvoiceLineDto invoiceLineDto)
        {
            await _invoiceLineService.CreateInvoiceLine(invoiceLineDto);
            return Ok();
        }

        [HttpPut(Name = "UpdateInvoiceLine")]
        public async Task<IActionResult> UpdateInvoiceLine(InvoiceLineDto invoiceLineDto)
        {
            await _invoiceLineService.UpdateInvoiceLine(invoiceLineDto);
            return Ok();
        }

        [HttpDelete("{invoiceLineId}", Name = "DeleteInvoiceLine")]
        public async Task<IActionResult> DeleteinvoiceLine(int invoiceLineId)
        { 
            await _invoiceLineService.DeleteInvoiceLine(invoiceLineId);
            return Ok();
        }
    }
}
