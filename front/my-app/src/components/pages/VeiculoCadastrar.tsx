import { useEffect, useState } from "react";
import { Veiculo } from "../../models/Veiculo";
import axios from "axios";

function VeiculoCadastrar() {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [ano, setAno] = useState("");
  const [disponivel, setDisponivel] = useState("");
  const [reservaId, setReservaId] = useState("");
  const [reservas, setReservas] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5272/api/reserva/listar")
      .then((resposta) => {
        setReservas(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao buscar reservas:", erro);
      });
  }, []);

  function enviarVeiculo(event: any) {
    event.preventDefault();
    const veiculo: Veiculo = {
      placa: placa,
      modelo: modelo,
      marca: marca,
      ano: ano,
      disponivel: disponivel === "true",
      reservaId: reservaId,
    };

    axios
      .post("http://localhost:5272/api/veiculo/cadastrar", veiculo)
      .then((resposta) => {
        console.log("Veículo cadastrado com sucesso:", resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao cadastrar veículo:", erro);
      });
  }

  return (
    <div>
      <h1>Cadastrar Veículo</h1>
      <form onSubmit={enviarVeiculo}>
        <div>
          <label>Placa:</label>
          <input
            type="text"
            value={placa}
            onChange={(event) => setPlaca(event.target.value)}
          />
        </div>
        <div>
          <label>Modelo:</label>
          <input
            type="text"
            value={modelo}
            onChange={(event) => setModelo(event.target.value)}
          />
        </div>
        <div>
          <label>Marca:</label>
          <input
            type="text"
            value={marca}
            onChange={(event) => setMarca(event.target.value)}
          />
        </div>
        <div>
          <label>Ano:</label>
          <input
            type="text"
            value={ano}
            onChange={(event) => setAno(event.target.value)}
          />
        </div>
        <div>
          <label>Disponível:</label>
          <select
            value={disponivel}
            onChange={(event) => setDisponivel(event.target.value)}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>
        <div>
          <label>Reserva:</label>
          <select
            value={reservaId}
            onChange={(event) => setReservaId(event.target.value)}
          >
            <option value="">Selecione uma reserva</option>
            {reservas.map((reserva) => (
              <option key={reserva.id} value={reserva.id}>
                {reserva.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default VeiculoCadastrar;
