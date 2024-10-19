using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddReservaTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Disponivel",
                table: "Veiculos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Reservas",
                columns: table => new
                {
                    ReservaId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CPF = table.Column<string>(type: "TEXT", nullable: false),
                    NomeCompleto = table.Column<string>(type: "TEXT", nullable: false),
                    Placa = table.Column<string>(type: "TEXT", nullable: false),
                    Modelo = table.Column<string>(type: "TEXT", nullable: false),
                    DataReserva = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservas", x => x.ReservaId);
                    table.ForeignKey(
                        name: "FK_Reservas_Usuarios_CPF",
                        column: x => x.CPF,
                        principalTable: "Usuarios",
                        principalColumn: "CPF",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reservas_Veiculos_Placa",
                        column: x => x.Placa,
                        principalTable: "Veiculos",
                        principalColumn: "Placa",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_CPF",
                table: "Reservas",
                column: "CPF");

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_Placa",
                table: "Reservas",
                column: "Placa");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reservas");

            migrationBuilder.DropColumn(
                name: "Disponivel",
                table: "Veiculos");
        }
    }
}
