using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class AppDataContext : DbContext
    {
        // DbSet para a tabela de Usuarios
        public DbSet<Usuario> Usuarios { get; set; }

        // DbSet para a tabela de Veiculos
        public DbSet<Veiculo> Veiculos { get; set; }

        // DbSet para a tabela de Reservas
        public DbSet<Reserva> Reservas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=app.db");
        }

    }
}
