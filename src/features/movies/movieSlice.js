import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/movieApiKey';

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async () => {
    const movieText = 'Harry';
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async () => {
    const serieText = 'Friends';
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${serieText}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncSelectedMoviesOrShows = createAsyncThunk(
  'movies/fetchAsyncSelectedMoviesOrShows',
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log('pending');
    },

    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log('Movies fetched successfully');
      return {
        ...state,
        movies: payload,
      };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log('fetching rejected');
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log('Series fetched successfully');
      return {
        ...state,
        shows: payload,
      };
    },
    [fetchAsyncSelectedMoviesOrShows.fulfilled]: (state, { payload }) => {
      console.log('selected movie or show fetched successfully');
      return {
        ...state,
        selectedMovieOrShow: payload,
      };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAllSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
