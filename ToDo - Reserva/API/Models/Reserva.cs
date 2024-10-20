using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Reserva
{
    [Key]
    public int ReservaId { get; set; } // Chave primária

    // Chave estrangeira para o usuário que fez a reserva
    [Required]
    [ForeignKey("Usuario")]
    public string CPF { get; set; } // CPF do usuário que fez a reserva

    // Chave estrangeira para o veículo reservado
    [Required]
    [ForeignKey("Veiculo")]
    public string Placa { get; set; } // Placa do veículo reservado

    public DateTime DataReserva { get; set; } = DateTime.Now; // Data da reserva

    // Adicionando as colunas para período de reserva
    [Required]
    public DateTime PeriodoInicial { get; set; } // Data de início da reserva

    [Required]
    public DateTime PeriodoFinal { get; set; } // Data de término da reserva
}
