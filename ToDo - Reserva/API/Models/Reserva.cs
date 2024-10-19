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

    [Required]
    public string NomeCompleto { get; set; } // Nome de quem fez a reserva

    // Chave estrangeira para o veículo reservado
    [Required]
    [ForeignKey("Veiculo")]
    public string Placa { get; set; } // Placa do veículo reservado

    public string Modelo { get; set; } // Modelo do veículo reservado

    public DateTime DataReserva { get; set; } = DateTime.Now; // Data da reserva
}
