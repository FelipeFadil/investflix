import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import canaisRepository from '../../../repositories/canais';

function CadastroVideo() {
  const history = useHistory();
  const [canais, setCanais] = useState([]);
  const channelNames = canais.map(({ nome }) => nome);
  const { handleChange, values } = useForm({
    titulo: '',
    url: '',
    canal: '',
  });

  useEffect(() => {
    canaisRepository
      .getAll()
      .then((canaisFromServer) => {
        setCanais(canaisFromServer);
      });
  }, []);

  console.log(canais);

  return (
    <PageDefault>
      <h1>Cadastro de vídeo</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        // alert('video cadastrado com sucesso!!');

        const canalEscolhido = canais.find((canal) => {
          return canal.nome === values.canal;
        })

        videosRepository.create({
          titulo: values.titulo,
          url: values.url,
          canaiId: canalEscolhido.id,
        })
          .then(() => {
            console.log('Cadastrou com sucesso!')
            history.push('/');
          });
      }}
      >

        <FormField
          label="Título do vídeo"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Canal"
          name="canal"
          value={values.canal}
          onChange={handleChange}
          suggestions={channelNames}
        />

        <Button type="submit">
            Cadastrar
        </Button>
      </form>

      <Link to='/cadastro/canais'>
          Cadastrar canal
      </Link>
    </PageDefault>
  );
}

  export default CadastroVideo;