using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface IInvoiceLineRepository
    {
        Task<ICollection<InvoiceLine>> GetInvoiceLines(int invoiceId);
        Task<InvoiceLine?> GetInvoiceLineById(int invoiceLineId);
        void CreateInvoiceLine(InvoiceLine invoiceLine);
        void UpdateInvoiceLine(InvoiceLine invoiceLine);
        void DeleteInvoiceLine(InvoiceLine invoiceLine);
        Task<bool> Save();
        Task<ICollection<InvoiceLine>> GetInvoiceLines(InvoiceLineQueryDto? invoiceLineQueryDto = null);
    }
}
