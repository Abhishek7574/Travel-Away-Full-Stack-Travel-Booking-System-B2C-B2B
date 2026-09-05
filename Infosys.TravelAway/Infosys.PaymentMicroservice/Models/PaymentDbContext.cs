using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Infosys.PaymentMicroservice.Models
{
    public class PaymentDBContext : DbContext
    {
        public DbSet<Payment> Payments { get; set; }

        public PaymentDBContext()
        {
        }

        public PaymentDBContext(DbContextOptions dbContextOptions)
            : base(dbContextOptions)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            var config = builder.Build();
            var connectionString = config.GetConnectionString("PaymentDBConnectionString");

            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Payment>()
                .ToTable(s => s.HasCheckConstraint(
                    "chk_PaymentStatus",
                    "PaymentStatus IN ('Confirmed', 'Not Confirmed')"
                ));

            modelBuilder.Entity<Payment>().HasData(
                new Payment
                {
                    PaymentId = 1,
                    BookingId = 4002,
                    TotalAmount = 200000,
                    PaymentStatus = "Confirmed"
                }
            );
        }
    }
}