﻿// <auto-generated />
using System;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(AppDataContext))]
    partial class AppDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.10");

            modelBuilder.Entity("API.Models.Reserva", b =>
                {
                    b.Property<int>("ReservaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CPF")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataReserva")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("PeriodoFinal")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("PeriodoInicial")
                        .HasColumnType("TEXT");

                    b.Property<string>("Placa")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ReservaId");

                    b.ToTable("Reservas");
                });

            modelBuilder.Entity("API.Models.Usuario", b =>
                {
                    b.Property<string>("CPF")
                        .HasColumnType("TEXT");

                    b.Property<string>("Celular")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CriadoEm")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("NomeCompleto")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("CPF");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("API.Models.Veiculo", b =>
                {
                    b.Property<string>("Placa")
                        .HasColumnType("TEXT");

                    b.Property<string>("Ano")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CriadoEm")
                        .HasColumnType("TEXT");

                    b.Property<string>("Disponivel")
                        .HasColumnType("TEXT");

                    b.Property<string>("Marca")
                        .HasColumnType("TEXT");

                    b.Property<string>("Modelo")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Placa");

                    b.ToTable("Veiculos");
                });
#pragma warning restore 612, 618
        }
    }
}
