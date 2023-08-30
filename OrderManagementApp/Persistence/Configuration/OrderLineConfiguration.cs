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
    public class OrderLineConfiguration : IEntityTypeConfiguration<OrderLine>
    {
        public void Configure(EntityTypeBuilder<OrderLine> builder)
        {
            builder.ToTable("OrderLine");
            builder.Property(p => p.Id)
            .IsRequired();
            builder.Property(p => p.Name)
                 .HasMaxLength(200);
            builder.Property(p => p.Quantity)
                 .HasMaxLength(6);
            builder.Property(p => p.TaxPercentage)
                 .HasColumnType("decimal(18,2)");
            builder.Property(p => p.UnitPrice)
                 .HasColumnType("decimal(18,2)");
            builder.Property(p => p.TotalWithoutTaxes)
                 .HasColumnType("decimal(18,2)");
            builder.Property(p => p.Total)
                 .HasColumnType("decimal(18,2)");
            builder.Property(p => p.TotalTaxes)
                 .HasColumnType("decimal(18,2)");

            builder.HasOne(p => p.Order)
                .WithMany(p => p.OrderLines)
                .HasForeignKey(p => p.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(p => p.Product)
               .WithMany(p => p.OrderLines)
               .HasForeignKey(p => p.ProductId)
               .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(p => p.TaxType)
               .WithMany(p => p.OrderLines)
               .HasForeignKey(p => p.TaxTypeId)
               .OnDelete(DeleteBehavior.NoAction);

            builder.HasKey(p => p.Id);

        }
    }
}
