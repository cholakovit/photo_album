import { createSlice, createAsyncThunk, current, createSelector } from "@reduxjs/toolkit"
import axios from "axios"

const PHOTO_URL = 'https://jsonplaceholder.typicode.com/photos'

const initialState = {
    albums: [],
    photos: [],
    favouritePhotos: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    albumStatus: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    albumError: null
}

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
    const response = await axios.get(PHOTO_URL)
    const albums = [...new Set(response.data.map(item => item.albumId))]
    return albums
})

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async (id) => {
    const response = await axios.get(PHOTO_URL, {
        params: {
            albumId: id
        }
    })
    return response.data
})

const photoSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { photoId } = action.payload
            const isFound = state.favouritePhotos.some(photo => photo?.id === photoId)
            if(isFound === false) {
                const existingPhoto = state.photos.find(photo => photo?.id === photoId)
                state.favouritePhotos.push(existingPhoto)  
                state.favouritePhotos = state.favouritePhotos.filter(photo => photo != null)
            }
        },
        removeFavouritePhoto(state, action) {
            const currentFavouritePhoto = current(state.favouritePhotos)
            const currentFavouritePhotos = currentFavouritePhoto.filter(favouritePhoto => favouritePhoto?.id !== action.payload.photoId)
            state.favouritePhotos = currentFavouritePhotos
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAlbums.pending, (state, action) => {   
                state.albumStatus = 'loading'
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.albumStatus = 'succeeded'
                state.albums = action.payload
                
            })
            .addCase(fetchAlbums.rejected, (state, action) => {
                state.albumStatus = 'failed'
                state.albumError = action.error.message
            })
            .addCase(fetchPhotos.pending, (state, action) => {   
                state.status = 'loading'
            })
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.photos = action.payload
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllAlbums = (state) => state.photos.albums
export const getAlbumStatus = (state) => state.photos.status
export const getAlbumErrors = (state) => state.photos.albumError

export const selectAllPhotos = (state) => state.photos.photos
export const selectFavouritePhotos = (state) => state.photos.favouritePhotos
export const getPhotosStatus = (state) => state.photos.status
export const getPhotosErrors = (state) => state.photos.error

export const selectPhotosByAlbumId = createSelector(
    [selectAllPhotos, (state, albumId) => albumId], (photos, albumId) => photos.filter(photo => photo.albumId === albumId)
)

export const { reactionAdded, removeFavouritePhoto } = photoSlice.actions

export default photoSlice.reducer
