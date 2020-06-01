using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace RangerApp.Models
{
    public partial class dbrangerappdevContext : DbContext
    {
        public dbrangerappdevContext()
        {
        }

        public dbrangerappdevContext(DbContextOptions<dbrangerappdevContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Containers> Containers { get; set; }
        public virtual DbSet<EventMessages> EventMessages { get; set; }
        public virtual DbSet<MastContainer> MastContainer { get; set; }
        public virtual DbSet<MastRole> MastRole { get; set; }
        public virtual DbSet<MastStatus> MastStatus { get; set; }
        public virtual DbSet<MastTerminal> MastTerminal { get; set; }
        public virtual DbSet<MigrationHistory> MigrationHistory { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=tcp:dbserver-rangerapp-dev.database.windows.net,1433;Initial Catalog=db-rangerapp-dev;User ID=Postenuser;Password=Posten123!");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Containers>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Accepted).HasDefaultValueSql("((0))");

                entity.Property(e => e.Ankdato).HasColumnType("datetime");

                entity.Property(e => e.Avgdato).HasColumnType("datetime");

                entity.Property(e => e.Bpx).HasMaxLength(50);

                entity.Property(e => e.Brev).HasMaxLength(50);

                entity.Property(e => e.Contbilnr).HasMaxLength(50);

                entity.Property(e => e.DriverId).HasColumnName("DriverID");

                entity.Property(e => e.Endret).HasColumnType("datetime");

                entity.Property(e => e.Endretav)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Fra)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Innholdsbeskrivelse).HasMaxLength(299);

                entity.Property(e => e.Lastbærer)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Opprettet).HasColumnType("datetime");

                entity.Property(e => e.Opprettetav)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Parti).HasMaxLength(50);

                entity.Property(e => e.Plombenummer).HasMaxLength(50);

                entity.Property(e => e.Produksjonsmodell)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Produksjonsvindu1løslast).HasMaxLength(50);

                entity.Property(e => e.Produksjonsvindu2).HasMaxLength(50);

                entity.Property(e => e.Produksjonsvindu2løslast).HasMaxLength(50);

                entity.Property(e => e.Pru).HasMaxLength(50);

                entity.Property(e => e.Rutekode).HasMaxLength(50);

                entity.Property(e => e.Sjåførnavnmerknad).HasMaxLength(100);

                entity.Property(e => e.Til)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Togrutenummer).HasMaxLength(50);

                entity.Property(e => e.Turnr).HasMaxLength(50);
            });

            modelBuilder.Entity<EventMessages>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .ForSqlServerIsClustered(false);

                entity.Property(e => e.Container)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.DriverId).HasColumnName("DriverID");

                entity.Property(e => e.EventTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(sysutcdatetime())");
            });

            modelBuilder.Entity<MastContainer>(entity =>
            {
                entity.Property(e => e.Active)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Containername)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Createdby)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('System')");

                entity.Property(e => e.Createddate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Updatedby)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Updateddate).HasColumnType("datetime");
            });

            modelBuilder.Entity<MastRole>(entity =>
            {
                entity.Property(e => e.RoleName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MastStatus>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<MastTerminal>(entity =>
            {
                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.TerminalName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MigrationHistory>(entity =>
            {
                entity.HasKey(e => new { e.MigrationId, e.ContextKey });

                entity.ToTable("__MigrationHistory");

                entity.Property(e => e.MigrationId).HasMaxLength(150);

                entity.Property(e => e.ContextKey).HasMaxLength(300);

                entity.Property(e => e.Model).IsRequired();

                entity.Property(e => e.ProductVersion)
                    .IsRequired()
                    .HasMaxLength(32);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Phone).HasMaxLength(15);

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");
            });
        }
    }
}
