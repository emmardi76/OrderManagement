using OrderManagementApp.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface ITaxTypeService
    {
        Task<ICollection<TaxTypeDto>> GetTaxes(TaxQueryDto taxQueryDto);
        Task<TaxTypeDto> CreateTax(TaxTypeDto taxesDto);       
        Task<TaxTypeDto> UpdateTax(TaxTypeDto taxesDto);
        Task DeleteTax(int id);
    }
}
