using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

namespace OrderManagementApp.Application.Services
{
    public class InvoiceLineService : IInvoiceLineService
    {
        private readonly IInvoiceLineRepository _invoiceLineRepository;
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IInvoiceService _invoiceService;
        private readonly IMapper _mapper;

        public InvoiceLineService(IInvoiceLineRepository invoiceLineRepository, IInvoiceRepository invoiceRepository, IInvoiceService invoiceService, IMapper mapper)
        {
            _invoiceLineRepository = invoiceLineRepository;
            _invoiceRepository = invoiceRepository;
            _invoiceService = invoiceService;
            _mapper = mapper;
        }

        public async Task CreateInvoiceLine(InvoiceLineDto invoiceLineDto)
        {
            //1. Get invoice with invoicelines to operate with it.
            var invoice = await _invoiceRepository.GetInvoiceWithLinesByInvoiceId(invoiceLineDto.InvoiceId);

            if (invoice == null)
            {
                throw new InvalidOperationException($"The invoice {invoiceLineDto.InvoiceId} does not exist.");
            }

            //2. Operate with invoiceLine, create and asing it to the invoice
            var invoiceLine = new InvoiceLine();
            _mapper.Map(invoiceLineDto, invoiceLine);
            invoiceLine.TotalWithoutTaxes = Math.Round(invoiceLine.Quantity * invoiceLine.UnitPrice, 2);
            invoiceLine.TotalTaxes = Math.Round(invoiceLine.TotalWithoutTaxes * (invoiceLine.TaxPercentage / 100), 2);
            invoiceLine.Total = Math.Round(invoiceLine.TotalWithoutTaxes + invoiceLine.TotalTaxes, 2);
            invoice.InvoiceLines.Add(invoiceLine);

            //3. Call to the function that modify the invoice setting the totals
            _invoiceService.SetInvoiceTotals(invoice);

            //4. Save to repository
            await _invoiceLineRepository.Save();
        }

        public async Task DeleteInvoiceLine(int invoiceLineId)
        {
             var invoiceLine = await GetInvoiceLineById(invoiceLineId);
            
            var invoice = await _invoiceRepository.GetInvoiceWithLinesByInvoiceId(invoiceLine.InvoiceId);

            if (invoice != null)
            {
                throw new InvalidOperationException($"The invoice {invoiceLine.InvoiceId} does not exist.");
            }

            invoice.InvoiceLines.Remove(invoiceLine);

            _invoiceService.SetInvoiceTotals(invoice);

            await _invoiceLineRepository.Save();

        }

        public async Task<ICollection<InvoiceLineDto>> GetInvoiceLines(InvoiceLineQueryDto invoiceLineQueryDto)
        {
            var listInvoiceLines = await _invoiceLineRepository.GetInvoiceLines(invoiceLineQueryDto);

            return _mapper.Map<ICollection<InvoiceLineDto>>(listInvoiceLines);
        }

        public async Task UpdateInvoiceLine(InvoiceLineDto invoiceLineDto)
        {
            var invoice = await _invoiceRepository.GetInvoiceWithLinesByInvoiceId(invoiceLineDto.InvoiceId);

            if (invoice == null)
            {
                throw new InvalidOperationException($"The order {invoiceLineDto.InvoiceId} does not exist.");
            }

            var invoiceLine = invoice.InvoiceLines.FirstOrDefault(x => x.Id == invoiceLineDto.Id);

            if(invoiceLine == null)
            {
                throw new InvalidOperationException($"The invoice line {invoiceLineDto.Id} does not exist.");
            }

            _mapper.Map(invoiceLineDto, invoiceLine);

            invoiceLine.TotalWithoutTaxes = Math.Round(invoiceLine.Quantity * invoiceLine.UnitPrice, 2);
            invoiceLine.TotalTaxes = Math.Round(invoiceLine.TotalWithoutTaxes * (invoiceLine.TaxPercentage / 100), 2);
            invoiceLine.Total = Math.Round(invoiceLine.TotalWithoutTaxes + invoiceLine.TotalTaxes, 2);

            _invoiceService.SetInvoiceTotals(invoice);

            await _invoiceLineRepository.Save();

        }

        private async Task<InvoiceLine> GetInvoiceLineById(int invoiceLineId)
        { 
            var invoiceLine = await _invoiceLineRepository.GetInvoiceLineById(invoiceLineId);

            if(invoiceLine == null)
            {
                throw new InvalidOperationException($"The invoiceLine with id {invoiceLineId} does not exist.");
            }

            return invoiceLine;
        }
    }
}
