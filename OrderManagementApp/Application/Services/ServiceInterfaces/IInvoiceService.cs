using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface IInvoiceService
    {
        Task<InvoiceDto> CreateInvoice(InvoiceDto invoiceDto);
        Task<ICollection<InvoiceListDto>> GetInvoices(InvoiceQueryDto invoiceQueryDto);
        Task<InvoiceDto> UpdateInvoice(InvoiceUpdateDto invoiceDto);
        Task DeleteInvoice(int id);
        Task<InvoiceDto> GetInvoice(int id);
        void SetInvoiceTotals(Invoice invoice);
    }
}