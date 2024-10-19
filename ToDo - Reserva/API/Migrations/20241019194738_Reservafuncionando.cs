using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Reservafuncionando : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Usuarios_CPF",
                table: "Reservas");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Veiculos_Placa",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_CPF",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_Placa",
                table: "Reservas");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Reservas_CPF",
                table: "Reservas",
                column: "CPF");

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_Placa",
                table: "Reservas",
                column: "Placa");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Usuarios_CPF",
                table: "Reservas",
                column: "CPF",
                principalTable: "Usuarios",
                principalColumn: "CPF",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Veiculos_Placa",
                table: "Reservas",
                column: "Placa",
                principalTable: "Veiculos",
                principalColumn: "Placa",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
