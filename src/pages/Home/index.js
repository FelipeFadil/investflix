/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
// import dadosIniciais from '../../data/dados_iniciais.json';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';
import canaisRepository from '../../repositories/canais';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    canaisRepository.getAllWithVideos()
      .then((canaisComVideos) => {
      // console.log(canaisComVideos);
        setDadosIniciais(canaisComVideos);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }, []);

  return (
    <PageDefault paddingAll={0}>
      {dadosIniciais.length === 0 && (<div>Loading...</div>)}

      {dadosIniciais.map((canal, indice) => {
        if (indice === 0) {
          return (
            <div key={canal.id}>
              <BannerMain
                videoTitle="PROGRAMADORES, COMO ESTÁ SUA EDUCAÇÃO FINANCEIRA?"
                url={dadosIniciais[0].videos[0].url}
                videoDescription=""
              />
              <Carousel
                ignoreFirstVideo
                category={dadosIniciais[0]}
              />
            </div>
          );
        }

        return (
          <Carousel
            key={canal.id}
            category={canal}
          />
        );
      })}

      {/* <BannerMain
        videoTitle={dadosIniciais.canais[0].videos[0].titulo}
        url={dadosIniciais.canais[0].videos[0].url}
        videoDescription={"O que é Front-end? Trabalhando na área os termos HTML, CSS e JavaScript fazem parte da rotina das desenvolvedoras e desenvolvedores. Mas o que eles fazem, afinal? Descubra com a Vanessa!"}
      />

      <Carousel
        ignoreFirstVideo
        category={dadosIniciais.canais[0]}
      />

      <Carousel
        category={dadosIniciais.canais[1]}
      />

      <Carousel
        category={dadosIniciais.canais[2]}
      />

      <Carousel
        category={dadosIniciais.canais[3]}
      />

      <Carousel
        category={dadosIniciais.canais[4]}
      />

      <Carousel
        category={dadosIniciais.canais[5]}
      />       */}

    </PageDefault>
  );
}

export default Home;
