export interface Reserva {
    id?: number;
    cpf: string;
    placa: string;
    periodoInicial: string;
    periodoFinal: string;
    formaPagamento: 'Cartão de Crédito' | 'Cartão de Débito' | 'PIX' | 'Dinheiro';
}