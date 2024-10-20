using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Addperiodo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NomeCompleto",
                table: "Reservas",
                newName: "PeriodoInicial");

            migrationBuilder.RenameColumn(
                name: "Modelo",
                table: "Reservas",
                newName: "PeriodoFinal");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PeriodoInicial",
                table: "Reservas",
                newName: "NomeCompleto");

            migrationBuilder.RenameColumn(
                name: "PeriodoFinal",
                table: "Reservas",
                newName: "Modelo");
        }
    }
}
