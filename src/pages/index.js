import { apiCamp, apiTabela, key1 } from "@/services/api";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
  // Obtenha os dados da primeira API
  const { data: data1 } = await axios.get(apiCamp, {
    headers: {
      Authorization: `Bearer ${key1}`,
    },
  });

  // Obtenha os dados da segunda API
  const { data: data2 } = await axios.get(
    `https://api.api-futebol.com.br/v1/campeonatos/10/tabela`,
    {
      headers: {
        Authorization: `Bearer ${key1}`,
      },
    }
  );

  // Combine os dados em um objeto
  const data = {
    data1,
    data2,
  };

  return {
    props: {
      data,
    },
    revalidate: 1,
  };
}

export default function Home({ data }) {
  const { data1, data2 } = data;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="clubes m-auto  mt-4">
        <div className=" flex-wrap md:flex-nowrap lg:flex-nowrap flex items-center justify-center">
          {data2.map((clube) => (
            <div className="clube">
              <Image
                className="max-h-12  hover:scale-110 duration-500"
                src={clube.time.escudo}
                height={50}
                width={50}
                alt={clube.time.sigla}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-around flex-wrap">
        {data1.map((campeonato) =>
          campeonato.campeonato_id === 2 || campeonato.campeonato_id === 10 ? (
            <div className="flex ">
              <div
                className="lg:mx-32 md:mx-32 sm:mx-5 mx-0 flex text-center items-center flex-col mt-16 hover:scale-110 duration-300"
                key={campeonato.campeonato_id}
              >
                <Link
                  className="font-bold text-3xl "
                  href={`/campeonatos/${campeonato.campeonato_id}`}
                >
                  <Image
                    src={campeonato.logo}
                    width={100}
                    height={100}
                    alt={campeonato.nome}
                  />
                </Link>
                <Link
                  className="font-bold text-3xl flex flex-col items-center mb-6"
                  href={`/campeonatos/${campeonato.campeonato_id}`}
                >
                  <h4>{campeonato.nome}</h4>
                  <h4>{campeonato.edicao_atual.temporada}</h4>
                </Link>
                <h2 className="uppercase font-semibold">
                  Nivel {campeonato.regiao}
                </h2>
                {/* <h2 className="font-semibold">{campeonato.rodada_atual.nome}</h2> */}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
