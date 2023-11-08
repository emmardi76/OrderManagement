using Microsoft.EntityFrameworkCore;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

namespace OrderManagementApp.Persistence.Repository
{
    public class InvoiceLineRepository : IInvoiceLineRepository
    {
        private readonly OrderContext _orderContext;

        public InvoiceLineRepository(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }

        public void CreateInvoiceLine(InvoiceLine invoiceLine)
        {
            _orderContext.InvoiceLines.Add(invoiceLine);
        }

        public void DeleteInvoiceLine(InvoiceLine invoiceLine)
        {
            _orderContext.InvoiceLines.Remove(invoiceLine);
        }

        public async Task<InvoiceLine?> GetInvoiceLineById(int invoiceLineId)
        {
            return await _orderContext.InvoiceLines.FirstOrDefaultAsync(il => il.Id == invoiceLineId);
        }

        public async Task<ICollection<InvoiceLine>> GetInvoiceLines(int invoiceId)
        {
            return await _orderContext.InvoiceLines.Where(il => il.InvoiceId == invoiceId).ToListAsync();
        }

        public async Task<ICollection<InvoiceLine>> GetInvoiceLines(InvoiceLineQueryDto? invoiceLineQueryDto = null)
        {
            var invoiceLine = _orderContext.InvoiceLines.AsQueryable<InvoiceLine>();

            if (invoiceLineQueryDto != null)
            {
                if (invoiceLineQueryDto.Id.HasValue)
                {
                    invoiceLine = invoiceLine.Where(il => il.Id == invoiceLineQueryDto.Id.Value);
                }

                if (invoiceLineQueryDto.InvoiceId.HasValue)
                {
                    invoiceLine = invoiceLine.Where(il => il.InvoiceId == invoiceLineQueryDto.InvoiceId.Value);
                }
            }

            return await invoiceLine.OrderBy(il => il.InvoiceId).ToListAsync();
        }

        public async Task<bool> Save()
        {
            return await _orderContext.SaveChangesAsync() >= 0 ? true : false;
        }

        public void UpdateInvoiceLine(InvoiceLine invoiceLine)
        {
            _orderContext.InvoiceLines.Update(invoiceLine);
        }
    }
}
