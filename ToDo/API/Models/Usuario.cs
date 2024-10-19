using System;
using System.ComponentModel.DataAnnotations;

public class Usuario
{
    [Key]
    public string CPF { get; set; } // CPF continua como chave primária

    public string NomeCompleto { get; set; }  
    public string? Email { get; set; }        
    public string? Celular { get; set; }
    public string Senha { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}
