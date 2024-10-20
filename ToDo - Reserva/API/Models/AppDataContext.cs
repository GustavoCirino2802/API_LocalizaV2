using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class AppDataContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Veiculo> Veiculos { get; set; }

        public DbSet<Reserva> Reservas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=app.db");
        }

    }
}
