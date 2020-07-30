import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCanais() {
  const valoresIniciais = {
    nome:'',
    descricao:'',
    cor:'',
  };
  const [canais, setCanais] = useState([]);
  const [values, setValues] = useState(valoresIniciais);
  


  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor, //nome: 'valor'
    });
  }

  function handleChange(infosDoEvento) {
    setValue(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value
    );
  }

  useEffect(() => {
    console.log('salve salve salve');
    const URL = 'http://localhost:8080/Canais';
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
            values
          ]);

          setValues(valoresIniciais);
        }}>

          <FormField
            label="Nome do Canal"
            type="text"
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