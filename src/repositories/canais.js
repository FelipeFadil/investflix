import config from '../config';

const URL_CANAIS = `${config.URL_BACKEND}/canais`;

function getAll() {
  return fetch(`${URL_CANAIS}`)
    .then(async (respostaDoServidor) => {

      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }

      throw new Error('Nao foi possivel pegar os dados')
    });
};

function getAllWithVideos() {
    return fetch(`${URL_CANAIS}?_embed=videos`)
      .then(async (respostaDoServidor) => {

        if (respostaDoServidor.ok) {
          const resposta = await respostaDoServidor.json();
          return resposta;
        }

        throw new Error('Nao foi possivel pegar os dados')
      });
};

export default {
    getAllWithVideos,
    getAll,
};