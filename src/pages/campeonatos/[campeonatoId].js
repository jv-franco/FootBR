import axios from "axios";
import { useRouter } from "next/router";

// Components

import Chaves from "@/components/Chaves";
import Tabela from "@/components/Tabela";
import { key2 } from "@/services/api";

//

export async function getServerSideProps({ query }) {
  const campeonatoId = query.campeonatoId;

  const api = `https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}`;

  const { data } = await axios.get(api, {
    headers: {
      Authorization: `Bearer ${key2}`,
    },
  });

  return {
    props: {
      campeonato: data,
    },
  };
}

export default function Campeonato({ campeonato }) {
  const router = useRouter();

  if (router.isFallback || !campeonato) {
    return <div>Carregando...</div>;
  }

  return campeonato.tipo == "Pontos Corridos" ? (
    <div>
      <h1>
        <Tabela
          campeonatoId={campeonato.campeonato_id}
          nome={campeonato.nome}
          rodada={campeonato.rodada_atual.rodada}
          rodada_nome={campeonato.rodada_atual.nome}
        />
      </h1>
    </div>
  ) : (
    <div>
      <Chaves
        campeonatoId={campeonato.campeonato_id}
        nome={campeonato.nome}
        fase={campeonato.fase_atual.fase_id}
        fase_nome={campeonato.fase_atual.nome}
      />
    </div>
  );
}
