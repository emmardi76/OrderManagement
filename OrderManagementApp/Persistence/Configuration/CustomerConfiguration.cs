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
    public class CustomerConfiguration: IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.ToTable("Customer");
            builder.Property(p => p.Id)
                .IsRequired();
            builder.Property(p =>p.FirstName)
                    .HasMaxLength(200);
            builder.Property(p => p.LastName)
                 .HasMaxLength(200);
            builder.Property(p => p.Email)
               .IsRequired()
               .HasMaxLength(200);
            builder.Property(p => p.PhoneNumber)
                .HasMaxLength(15);

            builder.HasKey(p => p.Id);
        }
    }
}
