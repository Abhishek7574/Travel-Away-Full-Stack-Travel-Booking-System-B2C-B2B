using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Infosys.TravelAway.DAL.Models;

public partial class TravelAwayDbContext : DbContext
{
    public TravelAwayDbContext()
    {
    }

    public TravelAwayDbContext(DbContextOptions<TravelAwayDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BookPackage> BookPackages { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

  

    public virtual DbSet<Package> Packages { get; set; }

    public virtual DbSet<PackageCategory> PackageCategories { get; set; }

    public virtual DbSet<PackageDetail> PackageDetails { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<Role> Roles { get; set; }
    [DbFunction("fn_ValidateAllLogins", "dbo")]
    public static int fn_ValidateAllLogins(string emailId, string password)
    {
        return 0;
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source =(localdb)\\MSSQLLocalDB;Initial Catalog=TravelAwayDB;Integrated Security=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BookPackage>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("pk_BookingId");

            entity.ToTable("BookPackage");

            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ContactNumber).HasColumnType("numeric(10, 0)");
            entity.Property(e => e.EmailId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.Email).WithMany(p => p.BookPackages)
                .HasForeignKey(d => d.EmailId)
                .HasConstraintName("fk_EmailId");

            entity.HasOne(d => d.Package).WithMany(p => p.BookPackages)
                .HasForeignKey(d => d.PackageId)
                .HasConstraintName("fk_packId");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.EmailId).HasName("pk_EmailId");

            entity.ToTable("Customer");

            entity.Property(e => e.EmailId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Address)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ContactNumber).HasColumnType("numeric(10, 0)");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Gender)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UserPassword)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Role).WithMany(p => p.Customers)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("fk_RoleId");
        });

        

        modelBuilder.Entity<Package>(entity =>
        {
            entity.HasKey(e => e.PackageId).HasName("pk_PackageId");

            entity.ToTable("Package");

            entity.HasIndex(e => e.PackageName, "UQ__Package__73856F7AB8FF8A7D").IsUnique();

            entity.Property(e => e.PackageName)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.TypeOfPackage)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.PackageCategory).WithMany(p => p.Packages)
                .HasForeignKey(d => d.PackageCategoryId)
                .HasConstraintName("fk_PackageCategoryId");
        });

        modelBuilder.Entity<PackageCategory>(entity =>
        {
            entity.HasKey(e => e.PackageCategoryId).HasName("pk_PackageCategoryId");

            entity.ToTable("PackageCategory");

            entity.HasIndex(e => e.PackageCategoryName, "UQ__PackageC__DD8EB474BE44965D").IsUnique();

            entity.Property(e => e.PackageCategoryName)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PackageDetail>(entity =>
        {
            entity.HasKey(e => e.PackageDetailsId).HasName("pk_PaclageDetailsId");

            entity.Property(e => e.Accomodation)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.PlacesToVisit)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.PricePerAdult).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.Package).WithMany(p => p.PackageDetails)
                .HasForeignKey(d => d.PackageId)
                .HasConstraintName("fk_PackageId");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("pk_PaymentId");

            entity.ToTable("Payment");

            entity.Property(e => e.PaymentStatus)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TotalAmount).HasColumnType("money");

            entity.HasOne(d => d.Booking).WithMany(p => p.Payments)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("fk_PaymentBookId");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.RatingId).HasName("pk_RatingId");

            entity.ToTable("Rating");

            entity.Property(e => e.Comments)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Rating1).HasColumnName("Rating");

            entity.HasOne(d => d.Booking).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("fk_BookId");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("pk_RoleId");

            entity.HasIndex(e => e.RoleName, "uq_RoleName").IsUnique();

            entity.Property(e => e.RoleId).ValueGeneratedOnAdd();
            entity.Property(e => e.RoleName)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);

        
    }

    protected static void OnModelCreatingPartial(ModelBuilder modelBuilder)
    {
        //hello
    }
}
