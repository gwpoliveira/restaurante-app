import { useState, useEffect } from 'react'
import {getPratos} from '../../api/restaurante'
import {Box, Typography, CircularProgress, Button  } from '@mui/material'
import Index from '../../componentes/CardPrato/index.jsx'

export default function Home() {
  const [pratos, setPratos] = useState()
  const [erro, setErro] = useState(false)
  const [carregando, setCarregando] = useState(false)


  useEffect(() => {
    setCarregando(true)
    setErro(false)
    const resposta = getPratos();
    resposta.then((dados) => {
      setPratos(dados.data);
    }).catch((erro) => {
      setErro(true)
    }).finally(() => {
      setCarregando(false)
    })
  }, []);

  return (
    <>
        {carregando && <span>Carregando</span>}
        {erro && <span>Erro ao carregar pratos</span>}
        <Typography gutterBottom variant="h2" component="div" sx={{textAlign: 'center'}}>
            Cardápio
        </Typography>
        {(pratos && pratos.length > 0) && <Box>
            {pratos.map((prato) => (
            <Index key={prato.id} prato={prato}/>
            ))}
        </Box>
        }
    </>
  )
};
