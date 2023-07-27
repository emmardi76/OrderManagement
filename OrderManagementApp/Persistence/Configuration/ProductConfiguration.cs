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
    public class ProductConfiguration: IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder
                .ToTable("Product")
                .HasKey(p => p.Id);

            builder.Property(p => p.Id)
               .IsRequired();
            builder.Property(p => p.Name)
               .HasMaxLength(200);
            builder.Property(p => p.Description)
                .HasMaxLength(200);

            builder.HasOne(p => p.TaxType)    
                    .WithMany(p => p.Product)
                    .HasForeignKey(p => p.TaxTypeId)
                     .OnDelete(DeleteBehavior.NoAction);

            builder.Property(p => p.UnitPrice)
                 .HasColumnType("decimal(18,2)");

            builder.HasKey(p => p.Id);
        }
    }
}
