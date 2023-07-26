using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Persistence.Configuration
{
    public class TaxTypeConfiguration: IEntityTypeConfiguration<TaxType>
    {
        public void Configure(EntityTypeBuilder<TaxType> builder)
        {
            builder.ToTable("TaxType");
            builder.Property(p => p.Id)
              .IsRequired();
            builder.Property(p => p.Name)
                  .HasMaxLength(200);
            builder.Property(p => p.TaxPercentage)
                   .HasColumnType("decimal(18,2)");

            builder.HasKey(p => p.Id);
        }
    }
}
