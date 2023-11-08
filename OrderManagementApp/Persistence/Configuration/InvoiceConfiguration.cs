using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderManagementApp.Domain.Entities;


namespace OrderManagementApp.Persistence.Configuration
{
    public class InvoiceConfiguration: IEntityTypeConfiguration<Invoice>
    {
        public void Configure(EntityTypeBuilder<Invoice> builder)
        {
            builder.ToTable("Invoice");
            builder.Property(p => p.Id)
                .IsRequired();
            builder.Property(p => p.InvoiceNumber)
                .HasMaxLength(10)
                .IsRequired();
            builder.Property(p => p.Date)
                .IsRequired(true);
            builder.Property(p => p.Remarks)
                 .HasMaxLength(200);
            builder.Property(p => p.DueDate)
                .IsRequired(true);
            builder.Property(p => p.TotalWithoutTaxes)
               .HasColumnType("decimal(18,2)");
            builder.Property(p => p.Total)
                 .HasColumnType("decimal(18,2)");
            builder.Property(p => p.TotalTaxes)
                 .HasColumnType("decimal(18,2)");


            builder.HasOne(p => p.Customer)
                     .WithMany(p => p.Invoices)
                .HasForeignKey(p => p.CustomerId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(p => p.CustomerAddress)
                         .WithMany(p => p.Invoices)
                         .HasForeignKey(p => p.CustomerAddressId)
                         .OnDelete(DeleteBehavior.NoAction);

            builder.HasKey(p => p.Id);
            
        }
    }
}