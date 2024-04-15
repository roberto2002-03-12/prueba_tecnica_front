import { Route, Routes } from 'react-router-dom'
import { FutbolistaPage } from '../app/pages'

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/futbolista' element={ <FutbolistaPage /> } />
        <Route path='/*' element={ <FutbolistaPage /> } />
      </Routes>
    </>

  )
}
