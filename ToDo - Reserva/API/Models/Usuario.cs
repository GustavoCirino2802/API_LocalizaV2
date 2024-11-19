using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Usuario
{
    [Key]
    public string CPF { get; set; } 

    public string NomeCompleto { get; set; }  
    public string? Email { get; set; }        
    public string? Celular { get; set; }
    public string Senha { get; set; }

}
