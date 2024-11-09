import React from 'react'
import AppLayout from '../../utils/AppLayout'
import './NotFound.css'

const NotFound = () => {
  return (
    <AppLayout>
      <div className="notfound">
        <h2>Produto Não Encontrado</h2>
        <p>Desculpe, mas não encontramos nenhum produto correspondente à sua busca. Tente utilizar palavras-chave diferentes.</p>
      </div>
    </AppLayout>
  )
}

export default NotFound