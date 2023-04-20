import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { key3 } from "@/services/api";
import setaPos from "../../public/images/setaPos.svg";
import neutroPos from "../../public/images/neutroPos.svg";
import x from "../../public/images/x.svg";
import { useMediaQuery } from "react-responsive";

export default function Tabela({ campeonatoId, rodada, rodada_nome, nome }) {
  const [dataTabela, setDataTabela] = useState([]);
  const [dataRodada, setDataRodada] = useState([]);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  useEffect(() => {
    axios
      .get(
        `https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}/tabela`,
        {
          headers: {
            Authorization: `Bearer ${key3}`,
          },
        }
      )
      .then((response) => {
        setDataTabela(response.data);
      });
    axios
      .get(
        `https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}/rodadas/${rodada}`,
        {
          headers: {
            Authorization: `Bearer ${key3}`,
          },
        }
      )
      .then((response) => {
        setDataRodada(response.data);
        console.log(dataRodada);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [dataTabela, campeonatoId]);

  return (
    <div className="shadow-md pb-10">
      <h1 className="text-center text-3xl font-semibold my-4 py-4 border-y-2">
        {nome}
      </h1>

      <div className="flex overflow-x-auto relative">
        <table className="w-full tabela">
          <thead>
            <tr className="text-left">
              <th className="fixo2">Pos</th>
              <th className="w-10/12 fixo">Time</th>

              <th>Var</th>
              <th>Pts</th>
              <th>PJ</th>
              <th>V</th>
              <th>E</th>
              <th>D</th>
              <th>GM</th>
              <th>GC</th>
              <th>SG</th>
              <th>Ult. Jogos</th>
            </tr>
          </thead>
          <tbody>
            {dataTabela.map((clube) => (
              <tr key={clube.time.id} className="focus:bg-red-100">
                <td
                  className={
                    clube.posicao <= 4
                      ? `border-l-8 border-blue-500 text-blue-600 fixo2`
                      : clube.posicao > 16
                      ? `border-l-8 border-red-500 text-red-700 fixo2`
                      : clube.posicao > 4 && clube.posicao <= 6
                      ? `border-l-8 border-blue-300 text-blue-300 fixo2 `
                      : clube.posicao >= 7 && clube.posicao <= 12
                      ? `border-l-8 border-orange-400 text-orange-400 fixo2`
                      : `border-l-8 `
                  }
                >
                  {clube.posicao}
                </td>
                <td className="inline-flex w-full items-center fixo">
                  <Image
                    src={clube.time.escudo}
                    height={30}
                    width={30}
                    alt={clube.time.sigla}
                  />
                  {isTabletOrMobile ? (
                    <h1 className="justify-normal ml-2 mr-8 w-full">
                      {clube.time.sigla}
                    </h1>
                  ) : (
                    <h1 className="justify-normal mx-2 w-full">
                      {clube.time.nome_popular}
                    </h1>
                  )}
                </td>
                <td>
                  {clube.variacao_posicao < 0 ? (
                    <div className="flex">
                      <Image
                        alt="seta para baixo"
                        className="down"
                        src={setaPos}
                        width={10}
                        height={10}
                      />
                      <h4 className="variacao_posicao">
                        {Math.abs(clube.variacao_posicao)}
                      </h4>
                    </div>
                  ) : clube.variacao_posicao > 0 ? (
                    <div className="flex">
                      <Image
                        alt="seta para cima"
                        src={setaPos}
                        width={10}
                        height={10}
                      />
                      <h4 className="variacao_posicao">
                        {clube.variacao_posicao}
                      </h4>
                    </div>
                  ) : (
                    <div className="flex">
                      <Image
                        alt="neutro"
                        src={neutroPos}
                        width={12}
                        height={12}
                      />
                    </div>
                  )}
                </td>
                <td>
                  <h1>{clube.pontos} </h1>
                </td>
                <td>
                  <h1>{clube.jogos}</h1>
                </td>
                <td>
                  <h1>{clube.vitorias}</h1>
                </td>
                <td>
                  <h1>{clube.empates}</h1>
                </td>
                <td>
                  <h1>{clube.derrotas}</h1>
                </td>
                <td>
                  <h1>{clube.gols_pro}</h1>
                </td>
                <td>
                  <h1>{clube.gols_contra}</h1>
                </td>
                <td>
                  <h1>{clube.saldo_gols}</h1>
                </td>
                <td className="   w-full">
                  {clube.ultimos_jogos.map((ultimo, indice) => (
                    <div
                      className={
                        ultimo == "v"
                          ? `bg-gradient-to-br from-green-600 via-green-500 to-green-400 last`
                          : ultimo == "d"
                          ? `last bg-gradient-to-br from-red-600 via-red-500 to-red-400`
                          : "last bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-300"
                      }
                      key={indice}
                    >
                      <h1 className="text-xs">{ultimo}</h1>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t-2 py-2 my-4 w-full flex justify-center items-center">
        <h1 className="uppercase font-semibold text-2xl"> RODADA ATUAL </h1>
      </div>
      <div className=" py-5 border-b-2  w-full flex justify-center items-center">
        <h1 className="uppercase font-semibold text-xl text-blue-950">
          {rodada_nome}
        </h1>
      </div>

      {dataRodada?.partidas?.map((partida) => (
        <div
          key={partida.partida_id}
          className="rodada_container flex flex-col items-center justify-center border-b-2 py-7"
        >
          <div className="flex items-center justify-center mb-4  w-full ">
            <h3 className="font-bold text-slate-700 text-xs">
              {partida.data_realizacao}
            </h3>
            <span className="font-normal mx-1 text-xs">
              {partida.estadio.nome_popular}
            </span>
            <h3 className="font-bold text-slate-700 text-xs">
              {partida.hora_realizacao}
            </h3>
          </div>
          <div className="flex  justify-center items-center w-full">
            <div className="flex justify-center items-center w-1/3 ">
              {isTabletOrMobile && (
                <h3 className="text-xl w-full text-right mr-4">
                  {partida.time_mandante.sigla}
                </h3>
              )}
              {!isTabletOrMobile && (
                <h3 className="text-xl w-full text-right mr-4">
                  {partida.time_mandante.nome_popular}
                </h3>
              )}
              <Image
                src={partida.time_mandante.escudo}
                height={40}
                width={40}
                alt={partida.time_mandante.sigla}
              />
            </div>
            <div className="flex mx-12 lg:mx-20 ">
              <span className="font-bold  text-xl">
                {partida.placar_mandante}
              </span>
              <Image
                alt="imagem de um x"
                className="x"
                src={x}
                width={13}
                height={13}
              />
              <span className="font-bold  text-xl">
                {partida.placar_visitante}
              </span>
            </div>

            <div className="flex justify-center items-center w-1/3">
              <Image
                src={partida.time_visitante.escudo}
                height={40}
                width={40}
                alt={partida.time_visitante.sigla}
              />
              {isTabletOrMobile && (
                <h3 className="text-xl w-full text-left ml-4">
                  {partida.time_visitante.sigla}
                </h3>
              )}
              {!isTabletOrMobile && (
                <h3 className="text-xl w-full text-left ml-4">
                  {partida.time_visitante.nome_popular}
                </h3>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
