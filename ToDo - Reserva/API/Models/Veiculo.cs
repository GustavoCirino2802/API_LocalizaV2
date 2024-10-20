using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Veiculo
{
    [Key]
    public string? Placa { get; set; } 

    public string Modelo { get; set; }  
    public string? Marca { get; set; }        
    public string? Ano { get; set; }
     public string? Disponivel { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}
