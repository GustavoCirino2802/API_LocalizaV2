import { Reserva } from "./Reserva";

export interface Veiculo {
    placa: string;
    modelo: string;
    marca: string;
    ano: string;
    disponivel: boolean;
    reservaId: string;
    reserva?: Reserva;
}

