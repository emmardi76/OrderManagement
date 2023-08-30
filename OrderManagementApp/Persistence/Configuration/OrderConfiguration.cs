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
    public class OrderConfiguration: IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Order");
            builder.Property(p => p.Id)
             .IsRequired();
            builder.Property(p => p.Date)
                .IsRequired(true);
            builder.Property(p => p.OrderNumber)
                .HasMaxLength(10);
            builder.Property(p => p.Remarks)
                 .HasMaxLength(200);
            builder.Property(p => p.TotalWithoutTaxes)
                .HasColumnType("decimal(18,2)");
            builder.Property(p => p.Total)
                 .HasColumnType("decimal(18,2)");
            builder.Property(p => p.TotalTaxes)
                 .HasColumnType("decimal(18,2)");

            builder.HasOne(p => p.Customer)
                .WithMany(p => p.Orders)
                .HasForeignKey(p => p.CustomerId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(p => p.CustomerAddress)
                .WithMany(p => p.Orders)
                .HasForeignKey(p => p.CustomerAddressId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasKey(p => p.Id);


        }
    }
}
