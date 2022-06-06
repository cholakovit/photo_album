import Loading from '../components/Loading'
import { Link } from "react-router-dom"
import { GiHearts } from 'react-icons/gi'
import { BsFillTrashFill } from 'react-icons/bs'

import { useDispatch } from "react-redux"
import { reactionAdded, removeFavouritePhoto } from "../main/photoSlice"

const Show = ({status, error, items, flag, favouritePhotos}) => {

    const dispatch = useDispatch()

    return (
        <div className="page">
            {error ? <p>{error}</p> : 
            status === 'loadling' ? 
                <Loading />
                : 
                <>
                    {
                        {
                            'albums':                     
                                <>
                                    <h1>Albums</h1>
                                    {items && items.map(album => 
                                        <Link to={`/photos/${album}`} key={album}>
                                            <img src='../../img/butterfly.gif' alt={album} />
                                            Album {album}
                                        </Link>
                                    )}
                                </>,
                            'photos':
                                <>
                                <h1>Photos</h1>
                                    {items && items.map(photo => 
                                        <div className='photo' key={photo.id}>
                                        <img src={photo.thumbnailUrl} alt={photo.title} />
                                        <h4>{photo.title}</h4>
                                            <div id={`${photo.id}`}>
                                            
                                            {favouritePhotos?.some(favouritePhoto => favouritePhoto?.id === photo.id) !== false ? 
                                                <button type='button' className='blueviolet'
                                                onClick={() => { dispatch(reactionAdded({ photoId: photo.id })) }}>
                                                <GiHearts />
                                                </button> 
                                                :                   
                                                <button type='button' onClick={() => { 
                                                    dispatch(reactionAdded({ photoId: photo.id })) }}>
                                                <GiHearts />
                                                </button>
                                            }
                                    
                                            </div>
                                        </div>
                                    )}
                                </>,
                            'favouritePhotos':
                                <>
                                    <h1>Favourite Photos</h1>
                                    {items?.map(favouritePhoto => (
                                        <div className='photo' key={favouritePhoto?.id}>
                                            <img src={favouritePhoto?.thumbnailUrl} alt={favouritePhoto?.title} />
                                            <h4>{favouritePhoto?.title}</h4>
                                            <button type='button' onClick={() => { 
                                                    dispatch(removeFavouritePhoto({ photoId: Number(favouritePhoto?.id) })) }}>
                                                <BsFillTrashFill />
                                            </button>
                                        </div>
                                    ))}
                                </>
                        }[flag]
                    }
                </>

            }
        </div>
    )
}

export default Show