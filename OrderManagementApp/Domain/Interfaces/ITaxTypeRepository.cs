using Microsoft.EntityFrameworkCore.Diagnostics;
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
        ICollection<TaxType> GetAll();
        TaxType GetTaxTypeById(int id);
        TaxType CreateTaxType(TaxType taxType);
        bool UpdateTaxType(TaxType taxType);
        bool DeleteTaxType(int id);
        bool Save();

        ICollection<Product> GetAllProductsWithTaxType(int id);
        ICollection<OrderLine> GetOrderLinesWithTaxType(int id);
    }
}
