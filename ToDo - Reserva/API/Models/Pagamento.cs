using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Pagamento
    {
        [Key]
        public int PagamentoId { get; set; }

        [ForeignKey("Reserva")]
        public int ReservaId { get; set; }

        [Required]
        public decimal ValorTotal { get; set; }

        [Required]
        public string MetodoPagamento { get; set; }

        public DateTime? DataPagamento { get; set; }

        public Reserva Reserva { get; set; }
    }
}
