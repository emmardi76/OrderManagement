using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IMapper _mapper;

        public InvoiceService(IInvoiceRepository invoiceRepository, IMapper mapper)
        {
            _invoiceRepository = invoiceRepository;
            _mapper = mapper;
        }

        public async Task<InvoiceDto> CreateInvoice(InvoiceDto invoiceDto)
        {
            var itemInvoice = await _invoiceRepository.GetInvoiceById(invoiceDto.Id);

            if (itemInvoice != null)
            {
                throw new InvalidOperationException("The invoice already exists");
            }

            var invoiceQueryDto = new InvoiceQueryDto
            {
                InvoiceNumber = invoiceDto.InvoiceNumber,
            };

            var invoices = await _invoiceRepository.GetInvoices(invoiceQueryDto);
            
            if(invoices.Any())
            {
                throw new InvalidOperationException("The invoice number already exists");
            }

            var invoice = _mapper.Map<Invoice>(invoiceDto);

            invoice.TotalWithoutTaxes = 0;
            invoice.TotalTaxes = 0;
            invoice.Total = 0;

            _invoiceRepository.CreateInvoice(invoice);
            await _invoiceRepository.Save();

            return _mapper.Map<InvoiceDto>(invoice);

        }
        

        public async Task DeleteInvoice(int id)
        {
           var invoice = await _invoiceRepository.GetInvoiceById(id);

            if (invoice == null)
            {
                throw new InvalidOperationException($"The invoice with id {id} does not exist.");
            }

            _invoiceRepository.DeleteInvoice(invoice);
            await _invoiceRepository.Save();
        }

        public async Task<InvoiceDto> GetInvoice(int id)
        {
            var invoice = await _invoiceRepository.GetInvoiceById(id);

            if (invoice == null)
            {
                throw new InvalidOperationException($"The invoice with id {id} does not exist.");
            }

            return _mapper.Map<InvoiceDto>(invoice);
        }

        public async Task<ICollection<InvoiceListDto>> GetInvoices(InvoiceQueryDto invoiceQueryDto)
        {
           var listInvoices = await _invoiceRepository.GetInvoices(invoiceQueryDto);

            return _mapper.Map<List<InvoiceListDto>>(listInvoices); 
        }

        public void SetInvoiceTotals(Invoice invoice)
        {
            invoice.Total = 0;
            invoice.TotalWithoutTaxes = 0;
            invoice.TotalTaxes = 0;
            foreach (var invoiceLine in invoice.InvoiceLines)
            {
                invoice.Total = invoice.Total + invoiceLine.Total;
                invoice.TotalWithoutTaxes = invoice.TotalWithoutTaxes + invoiceLine.TotalWithoutTaxes;
                invoice.TotalTaxes = invoice.TotalTaxes + invoiceLine.TotalTaxes;
            }
        }

        public async Task<InvoiceDto> UpdateInvoice(InvoiceUpdateDto invoiceDto)
        {
           var invoice = await _invoiceRepository.GetInvoiceById(invoiceDto.Id);

           if (invoice == null)
           {
                throw new InvalidOperationException($"The invoice with id {invoiceDto.Id} does not exist.");
           }

           _mapper.Map<InvoiceDto>(invoice);
           await _invoiceRepository.Save();

           return _mapper.Map<InvoiceDto>(invoice);
        }
    }
}
