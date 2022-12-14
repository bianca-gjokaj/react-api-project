import axios from "axios";
import { config } from "../config";
import movie from "../data/movies.data";
import { Movie, MovieFilter, MovieResults } from "../types";

export function fetchMovieData() {
  return axios
    .get<MovieResults>(
      `https://api.themoviedb.org/3/discover/movie?api_key=${config.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    )
    .then((response) => response);
}

export function fetchMovieByTitle(title: string) {
  return axios
    .get<MovieResults>(
      `https://api.themoviedb.org/3/search/movie?api_key=${config.apiKey}&language=en-US&page=1&include_adult=false`,
      {
        params: {
          query: title,
        },
      }
    )
    .then((response) => response);
}

export function fetchFilteredMovies(filter: MovieFilter) {
  return axios.get<MovieResults>(
    `https://api.themoviedb.org/3/discover/movie?api_key=${config.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
    {
      params: {
        "vote_average.gte": filter.rating_gte || 0,
        "vote_average.lte": filter.rating_lte || 10,
      },
    }
  );
}

export function fetchGenres(id: number) {
  return axios.get<MovieResults>(``);
}

// https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US

// https://developers.themoviedb.org/3/discover/movie-discover
//when filtering - use with genre - will return movies of that genre
