import { useParams } from 'react-router-dom'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getPhotosStatus, fetchPhotos, selectPhotosByAlbumId, getPhotosErrors, selectFavouritePhotos } from "./photoSlice"
import Show from '../components/Show'

const Photos = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const status = useSelector(getPhotosStatus)
  const error = useSelector(getPhotosErrors)

  const postsByAlbumId = useSelector(state => selectPhotosByAlbumId(state, Number(id)))

  const favouritePhotos = useSelector(state => selectFavouritePhotos(state))

  useEffect(() => {
    dispatch(fetchPhotos(id))
  },[id])

  return <Show status={status} error={error} items={postsByAlbumId} favouritePhotos={favouritePhotos} flag={'photos'} />
}

export default Photos