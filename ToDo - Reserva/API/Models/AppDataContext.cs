using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class AppDataContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Veiculo> Veiculos { get; set; }

        public DbSet<Reserva> Reservas { get; set; }
        
        public DbSet<Pagamento> Pagamentos { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Reserva>()
                .Property(r => r.ReservaId)
                .ValueGeneratedOnAdd(); 
            modelBuilder.Entity<Pagamento>()
                .Property(p => p.PagamentoId)
                .ValueGeneratedOnAdd(); 
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=app.db");
        }
    }
}
