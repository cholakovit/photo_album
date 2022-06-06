import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAlbumStatus, getAlbumErrors, fetchAlbums, selectAllAlbums } from "./photoSlice"
import Show from '../components/Show'

const Albums = () => {

    const dispatch = useDispatch()
    const status = useSelector(getAlbumStatus)
    const error = useSelector(getAlbumErrors)
    const albums = useSelector(selectAllAlbums)
    useEffect(() => {
      if (status === 'idle') {
          dispatch(fetchAlbums())
      }

    }, [status, dispatch])
    
    return <Show status={status} error={error} items={albums} flag={'albums'} />
    
}

export default Albums