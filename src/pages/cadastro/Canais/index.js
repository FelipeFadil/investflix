import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCanais() {
  const valoresIniciais = {
    nome:'',
    descricao:'',
    cor:'',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [canais, setCanais] = useState([]);

  useEffect(() => {
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/canais'
      : 'https://investflix-felipefadil.herokuapp.com/canais';
    fetch(URL)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCanais([
          ...resposta,
        ]);
      });
      
  }, []);
  

    return (
      <PageDefault>
        <h1>Cadastro de canais: {values.nome}</h1>

        <form onSubmit={function handleSubmit(infosDoEvento) {
          infosDoEvento.preventDefault();
          setCanais([
            ...canais,
            values,
          ]);

          clearForm();
        }}>

          <FormField
            label="Nome do Canal"
            name="nome"
            value={values.nome}
            onChange={handleChange}
          />

          <FormField
            label="Descricao"
            type="textarea"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
          />

          <FormField
            label="Cor"
            type="color"
            name="cor"
            value={values.cor}
            onChange={handleChange}
          />

          <Button>
            Cadastrar
          </Button>
        </form>

        {canais.lenght === 0 && (
          <div>
            Loading...
          </div>
        )}

        <ul>
          {canais.map((canal) => {
            return (
              <li key={`${canal.nome}`}>
                {canal.nome}
              </li>
            )
          })}  
        </ul>


        <Link to="/">
            Ir para home
        </Link>
      </PageDefault>
    );
  }

  export default CadastroCanais;