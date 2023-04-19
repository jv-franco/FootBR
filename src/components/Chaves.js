import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { key2 } from "@/services/api";
import { useMediaQuery } from "react-responsive";

import x from "../../public/images/x.svg";

export default function Chaves({ campeonatoId, nome, fase, fase_nome }) {
  const [dataChaves, setDataChaves] = useState([]);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    axios
      .get(
        `https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}/fases/${fase}`,
        {
          headers: {
            Authorization: `Bearer ${key2}`,
          },
        }
      )
      .then((response) => {
        setDataChaves(response.data);
        console.log(dataChaves);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [dataChaves, fase, campeonatoId]);
  return (
    <div>
      <h1 className="text-center w-full text-3xl font-semibold mb-16 py-4 border-y-2">
        {nome}
      </h1>

      <div className="flex flex-col justify-between border-b-2 py-3">
        <div className="border-b-2 py-4 my-4 w-full flex justify-center items-center">
          <h1 className="uppercase font-semibold text-2xl"> Fase Atual </h1>
        </div>
        <div className=" my-4 w-full flex justify-center items-center">
          <h1 className="uppercase font-semibold text-xl"> {fase_nome} </h1>
        </div>
      </div>
      <h3 className="text-2xl font-semibold py-9">TABELA</h3>
      {dataChaves?.chaves?.map((chave) => (
        <div key={chave.nome} className="  w-full">
          <div className="border-2 flex flex-col items-center justify-center mb-6 relative lg:flex-row  ">
            <div className="container_Chave">
              <div className="flex items-center justify-center  w-full ">
                <h3 className="font-bold text-slate-700 text-xs">
                  {chave.partida_ida.data_realizacao}
                </h3>
                <span className="font-normal mx-1 text-xs">
                  {chave.partida_ida.estadio.nome_popular}
                </span>
                <h3 className="font-bold text-slate-700 text-xs">
                  {chave.partida_ida.hora_realizacao}
                </h3>
              </div>
              <div className="flex  justify-center items-center w-full">
                <div className="flex justify-center items-center w-1/3 ">
                  {isTabletOrMobile && (
                    <h3 className="text-xl w-full text-right mr-2">
                      {chave.partida_ida.time_mandante.sigla}
                    </h3>
                  )}
                  {!isTabletOrMobile && (
                    <h3 className="text-xl w-full text-right mr-2">
                      {chave.partida_ida.time_mandante.nome_popular}
                    </h3>
                  )}
                  <Image
                    src={chave.partida_ida.time_mandante.escudo}
                    height={30}
                    width={30}
                    alt={chave.partida_ida.time_mandante.sigla}
                  />
                </div>
                <div className="flex mx-5">
                  <span className="font-bold  text-xl">
                    {chave.partida_ida.placar_mandante}
                  </span>
                  <Image
                    className="x"
                    alt="imagem de um x"
                    src={x}
                    width={13}
                    height={13}
                  />
                  <span className="font-bold  text-xl">
                    {chave.partida_ida.placar_visitante}
                  </span>
                </div>

                <div className="flex justify-center items-center w-1/3">
                  <Image
                    src={chave.partida_ida.time_visitante.escudo}
                    height={30}
                    width={30}
                    alt={chave.partida_ida.time_visitante.sigla}
                  />
                  {isTabletOrMobile && (
                    <h3 className="text-xl w-full text-left ml-2">
                      {chave.partida_ida.time_visitante.sigla}
                    </h3>
                  )}
                  {!isTabletOrMobile && (
                    <h3 className="text-xl w-full text-left ml-2">
                      {chave.partida_ida.time_visitante.nome_popular}
                    </h3>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-xl text-slate-400 text-xs py-1 px-3">
              {chave.nome}
            </div>
            <div className="container_Chave2">
              <div className="flex items-center justify-center  w-full ">
                <h3 className="font-bold text-slate-700 text-xs">
                  {chave.partida_volta.data_realizacao}
                </h3>
                <span className="font-normal mx-1 text-xs">
                  {chave.partida_volta.estadio.nome_popular}
                </span>
                <h3 className="font-bold text-slate-700 text-xs">
                  {chave.partida_volta.hora_realizacao}
                </h3>
              </div>
              <div className="flex  justify-center items-center w-full">
                <div className="flex justify-center items-center w-1/3 ">
                  {isTabletOrMobile && (
                    <h3 className="text-xl w-full text-right mr-2">
                      {chave.partida_volta.time_mandante.sigla}
                    </h3>
                  )}
                  {!isTabletOrMobile && (
                    <h3 className="text-xl w-full text-right mr-2">
                      {chave.partida_volta.time_mandante.nome_popular}
                    </h3>
                  )}
                  <Image
                    src={chave.partida_volta.time_mandante.escudo}
                    height={30}
                    width={30}
                    alt={chave.partida_volta.time_mandante.sigla}
                  />
                </div>
                <div className="flex mx-5">
                  <span className="font-bold  text-xl">
                    {chave.partida_volta.placar_mandante}
                  </span>
                  <Image
                    className="x"
                    alt="imagem de um x"
                    src={x}
                    width={13}
                    height={13}
                  />
                  <span className="font-bold  text-xl">
                    {chave.partida_volta.placar_visitante}
                  </span>
                </div>

                <div className="flex justify-center items-center w-1/3">
                  <Image
                    src={chave.partida_volta.time_visitante.escudo}
                    height={30}
                    width={30}
                    alt={chave.partida_volta.time_visitante.sigla}
                  />
                  {isTabletOrMobile && (
                    <h3 className="text-xl w-full text-left ml-2">
                      {chave.partida_volta.time_visitante.sigla}
                    </h3>
                  )}
                  {!isTabletOrMobile && (
                    <h3 className="text-xl w-full text-left ml-2">
                      {chave.partida_volta.time_visitante.nome_popular}
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
