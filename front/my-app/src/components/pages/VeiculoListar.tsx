import { useEffect, useState } from "react";
import { Veiculo } from "../../models/Veiculo";
import "./VeiculoListar.css";

function VeiculoListar() {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

    useEffect(() => {
        pesquisarVeiculos();
      });

      function pesquisarVeiculos() {
        fetch("http://localhost:5272/api/veiculo/listarTudo")
        .then((resposta) => resposta.json())
      .then((veiculos) => {
        setVeiculos(veiculos);
      });
      }   

      return (
        <div id="listar_veiculoos">
          <h1>Lista de Veiculos</h1>
          <table id="tabela">
            <thead>
              <tr>
                <th>#</th>
                <th>Placa</th>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Ano</th>
                <th>Disponivel</th>
              </tr>
            </thead>
            <tbody>
              {veiculos.map((veiculo) => (
                <tr>
                  <td>{veiculo.placa}</td>
                  <td>{veiculo.modelo}</td>
                  <td>{veiculo.marca}</td>
                  <td>{veiculo.ano}</td>
                  <td>{veiculo.disponivel}</td>
                  <td>{veiculo.reservaId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default VeiculoListar;