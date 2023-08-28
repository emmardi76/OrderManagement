using Microsoft.EntityFrameworkCore;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

namespace OrderManagementApp.Persistence.Repository
{
    public class TaxTypeRepository : ITaxTypeRepository
    {
        private readonly OrderContext _orderContext;

        public TaxTypeRepository(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }

        public void CreateTaxType(TaxType taxType)
        {
            _orderContext.TaxTypes.Add(taxType);
        }

        public void DeleteTaxType(TaxType taxType)
        {
            _orderContext.TaxTypes.Remove(taxType);
        }

        public async Task<ICollection<TaxType>> GetAll(TaxQueryDto taxQueryDto)
        {
            var taxes = _orderContext.TaxTypes.AsQueryable<TaxType>();

            if (taxQueryDto != null)
            {
                if (taxQueryDto.Id.HasValue)
                {
                    taxes = taxes.Where(t => t.Id == taxQueryDto.Id.Value);
                }

                if (taxQueryDto.Name is not null)
                {
                    taxes = taxes.Where(t => t.Name != null && t.Name.Contains(taxQueryDto.Name));
                }   
                
                if(taxQueryDto.TaxPercentage.HasValue)
                {
                    taxes = taxes.Where(t => t.TaxPercentage == taxQueryDto.TaxPercentage.Value);
                }
            }

            return await taxes.OrderBy(t => t.Name).ToListAsync();
        }

        public async Task<ICollection<Product>> GetAllProductsWithTaxType(int id)
        {
            var products = await _orderContext.Products.FirstOrDefaultAsync(p => p.TaxTypeId == id);
            if (products == null)
            {
                return null;
            }
            return (ICollection<Product>)products;
        }

        public async Task<ICollection<OrderLine>> GetOrderLinesWithTaxType(int id)
        {
           var orderlines = await _orderContext.OrderLines.FirstOrDefaultAsync(ol => ol.TaxTypeId == id);

            if (orderlines == null)
            {
                return null;
            }
            return (ICollection<OrderLine>)orderlines;
        }

        public async Task<TaxType?> GetTaxTypeById(int id)
        {
            return await _orderContext.TaxTypes.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<bool> Save()
        {
            return await _orderContext.SaveChangesAsync() >= 0 ? true : false;
        }

        public void UpdateTaxType(TaxType taxType)
        {
            _orderContext.Set<TaxType>().Update(taxType);
        }
    }
}
