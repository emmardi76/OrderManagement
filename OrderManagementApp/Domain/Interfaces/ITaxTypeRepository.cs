using Microsoft.EntityFrameworkCore.Diagnostics;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface ITaxTypeRepository
    {
        Task<ICollection<TaxType>> GetAll(TaxQueryDto taxQueryDto);
        Task<TaxType> GetTaxTypeById(int id);
        void CreateTaxType(TaxType taxType);
        void UpdateTaxType(TaxType taxType);
        void DeleteTaxType(int id);
        Task<bool> Save();

        Task<ICollection<Product>> GetAllProductsWithTaxType(int id);
        Task<ICollection<OrderLine>> GetOrderLinesWithTaxType(int id);
    }
}
