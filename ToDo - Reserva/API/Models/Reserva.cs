using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Reserva
{
    [Key]
    public int ReservaId { get; set; } 

    
    [Required]
    [ForeignKey("Usuario")]
    public string CPF { get; set; } 

   
    [Required]
    [ForeignKey("Veiculo")]
    public string Placa { get; set; } 

    public DateTime DataReserva { get; set; } = DateTime.Now; 
  
    [Required]
    public DateTime PeriodoInicial { get; set; } 

    [Required]
    public DateTime PeriodoFinal { get; set; } 
}
