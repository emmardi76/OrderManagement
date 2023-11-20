using OrderManagementApp.Application.Dtos;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface IInvoiceLineService
    {
        Task<ICollection<InvoiceLineDto>> GetInvoiceLines(InvoiceLineQueryDto invoiceLineQueryDto);
        Task CreateInvoiceLine(InvoiceLineDto invoiceLineDto);
        Task UpdateInvoiceLine(InvoiceLineDto invoiceLineDto);
        Task DeleteInvoiceLine(int invoiceLineId);
    }
}
