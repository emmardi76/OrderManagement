using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<ICollection<Invoice>> GetInvoices(InvoiceQueryDto invoiceQueryDto);
        Task<Invoice?> GetInvoiceById(int id);
        Task<Invoice?> GetInvoiceWithLinesByInvoiceId(int id);
        void CreateInvoice(Invoice invoice);
        void UpdateInvoice(Invoice invoice);

        void DeleteInvoice(Invoice invoice);
        Task<bool> Save();

        Task<ICollection<InvoiceLine>> GetInvoiceLines(int invoiceId);
        Task<ICollection<Invoice>> GetInvoiceByCustomerId(int customerId);
    }
}
