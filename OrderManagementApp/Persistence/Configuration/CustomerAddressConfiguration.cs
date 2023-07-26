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
    public class CustomerAddressConfiguration: IEntityTypeConfiguration<CustomerAddress>
    {
        public void Configure(EntityTypeBuilder<CustomerAddress> builder)
        {
            builder.ToTable("CustomerAddress");
            builder.Property(p => p.Id)
                .IsRequired();
            builder.Property(p => p.Description)
                  .HasMaxLength(200);
            builder.Property(p => p.Street)
                .HasMaxLength(200);                  
            builder.Property(p => p.StreetNumber)
                .HasMaxLength(5);
            builder.Property(p => p.Door)
                .HasMaxLength(5);
            builder.Property(p => p.ZipCode)
              .HasMaxLength(5);
            builder.Property(p => p.City)
               .HasMaxLength(200);
            builder.Property(p => p.Country)
                .HasMaxLength(200);

            builder.HasKey(p => p.Id);

            builder.HasOne(p => p.Customer)
                .WithMany(p => p.CustomerAddress)
                .HasForeignKey(p => p.CustomerId);
        }
    }
}
