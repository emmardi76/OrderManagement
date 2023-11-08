using Microsoft.EntityFrameworkCore;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

namespace OrderManagementApp.Persistence.Repository
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly OrderContext _orderContext;

        public InvoiceRepository(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }

        public async Task<ICollection<Invoice>> GetInvoices(InvoiceQueryDto invoiceQueryDto)
        {
            var invoices = _orderContext.Invoices.AsQueryable<Invoice>();

            if (invoiceQueryDto != null)
            {
                if(invoiceQueryDto.Id.HasValue)
                {
                    invoices = invoices.Where(i => i.Id == invoiceQueryDto.Id);
                }

                if (invoiceQueryDto.InvoiceNumber is not null)
                {
                    invoices = invoices.Where(i => i.InvoiceNumber != null && i.InvoiceNumber.Contains(invoiceQueryDto.InvoiceNumber));
                }

                if (invoiceQueryDto.CustomerId.HasValue)
                {
                    invoices = invoices.Where(i => i.CustomerId == invoiceQueryDto.CustomerId.Value);
                }

                if (invoiceQueryDto.CustomerAddressId.HasValue)
                {
                    invoices = invoices.Where(i => i.CustomerAddressId == invoiceQueryDto.CustomerAddressId.Value);
                }

                if (!string.IsNullOrWhiteSpace(invoiceQueryDto.CustomerName))
                {
                    invoices = invoices.Where(i => i.Customer != null && (i.Customer.FirstName+ ""+ i.Customer.LastName).Contains(invoiceQueryDto.CustomerName));
                }

                if (invoiceQueryDto.Date.HasValue)
                {
                    var fromDate = invoiceQueryDto.Date.Value.Date;
                    var toDate = fromDate.AddDays(1);
                    invoices = invoices.Where(i => i.Date >= fromDate && i.Date < toDate);
                }

                if (invoiceQueryDto.Remarks is not null)
                {
                    invoices = invoices.Where(i => i.Remarks != null && i.Remarks.Contains(invoiceQueryDto.Remarks));
                }

                if (invoiceQueryDto.DueDate.HasValue)
                {
                    var fromDate = invoiceQueryDto.DueDate.Value.Date;
                    var toDate = fromDate.AddDays(1);
                    invoices = invoices.Where(i => i.DueDate >= fromDate && i.DueDate < toDate);
                }

                if (invoiceQueryDto.Total.HasValue)
                {
                    invoices = invoices.Where(i => i.Total == invoiceQueryDto.Total);
                }

                if (invoiceQueryDto.TotalTaxes.HasValue)
                {
                    invoices = invoices.Where(i => i.TotalTaxes == invoiceQueryDto.TotalTaxes);
                }
                
            }

            return await invoices.Include(i => i.Customer).OrderBy(i => i.Id).ToListAsync();
        }

        public async Task<Invoice?> GetInvoiceById(int id)
        {
            return await _orderContext.Invoices.Include(i => i.Customer).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Invoice?> GetInvoiceWithLinesByInvoiceId(int id)
        {
            return await _orderContext.Invoices.Include(i=> i.InvoiceLines).FirstOrDefaultAsync(i => i.Id == id);
        }

        public void CreateInvoice(Invoice invoice)
        {
            _orderContext.Invoices.Add(invoice);
        }

        public void UpdateInvoice(Invoice invoice)
        {
            _orderContext.Invoices.Update(invoice);
        }

        public void DeleteInvoice(Invoice invoice)
        {
            _orderContext.Invoices.Remove(invoice);
        }


        public async Task<bool> Save()
        {
            return await _orderContext.SaveChangesAsync() >= 0 ? true : false;
        }

        public async Task<ICollection<InvoiceLine>> GetInvoiceLines(int invoiceId)
        {
           return await _orderContext.InvoiceLines.Where(il => il.InvoiceId == invoiceId).ToListAsync();
        }

        public async Task<ICollection<Invoice>> GetInvoiceByCustomerId(int customerId)
        {
            return await _orderContext.Invoices.Where(i => i.CustomerId == customerId).ToListAsync();
        }        
    }
}