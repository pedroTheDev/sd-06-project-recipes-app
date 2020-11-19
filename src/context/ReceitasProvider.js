import React from 'react'
import ReceitasContext from './ReceitasContext'

const ReceitasProvider = ({children}) => {
  const state = {

  }

  return (
    <ReceitasContext.Provider value={state}>
      {children}
    </ReceitasContext.Provider>
  )
}

export default ReceitasProvider
