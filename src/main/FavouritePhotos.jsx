import { useSelector } from "react-redux"
import Show from "../components/Show"
import {selectFavouritePhotos } from "./photoSlice"


const FavouritePhotos = () => {

    const favouritePhotos = useSelector(state => selectFavouritePhotos(state))

    console.log(favouritePhotos)

    return <Show items={favouritePhotos} flag={'favouritePhotos'} />
}

export default FavouritePhotos