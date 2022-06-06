import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Albums from "./main/Albums"
import FavouritePhotos from './main/FavouritePhotos'
import Photos from './main/Photos'

function App() {


    return (
        <>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Albums />} />

              <Route path='photos'>
                <Route path=':id' element={<Photos />} />
                <Route path='favourites' element={<FavouritePhotos />} />
              </Route>

              {/* Catch all - replace with 404 component if you want */}
              <Route path='*' element={<Navigate to='/' replace />} />
            </Route>
          </Routes>
        </>
    )
}

export default App