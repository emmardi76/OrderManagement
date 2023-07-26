using Microsoft.EntityFrameworkCore;
using OrderManagementApp.Domain.Entities;
using System.Reflection;

namespace OrderManagementApp.Persistence
{
    public class OrderContext : DbContext
    {
        private DbContextOptions _options;

        public OrderContext() { }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public OrderContext(DbContextOptions options) : base(options)
        {
            _options = options;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<CustomerAddress> CustomerAddresses { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<TaxType> TaxTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
