import { FilterMovies, MovieResults } from "../types";
import { fetchMovieByTitle, fetchMovieData } from "../services/movies.service";
import { useEffect, useState } from "react";

export function Movies() {
  const [movies, setMovies] = useState<FilterMovies[]>([]);
  const [movie, setMovie] = useState<FilterMovies>();
  const [movieTitle, setMovieTitle] = useState("");

  useEffect(() => {
    if (movieTitle === "") {
      getAllMovies();
    }
  }, [movieTitle]);

  function getAllMovies() {
    fetchMovieData().then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }

  function handleSearchMovie() {
    console.log("SearchMovie");
    fetchMovieByTitle(movieTitle).then((response) => {
      console.log(response);
      setMovies(response.data.results);
    });
  }

  return (
    <div className="">
      <div className="flex justify-center">
        <h1 className="text-7xl font-bold  text-green-400">GET.</h1>
        <h1 className="text-7xl font-bold  text-black">Movies</h1>
      </div>

      <div className="w-200 h-10 m-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative">
        <input
          className="appearance-none w-full outline-none focus:outline-none active:outline-none"
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Search movies by name..."
        />

        <button
          onClick={() => handleSearchMovie()}
          className="ml-1 outline-none focus:outline-none active:outline-none"
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
      <div className=" m-7 table-c justify-around  ">
        <ul className="space-y-4 md:space-y-0 md:grid grid-cols-4 gap-4 ">
          {movies.map((movieList) => (
            <li
              className=" rounded-xl shadow-md p-10 space-y-4 h-70"
              key={movieList.title}
            >
              <div className="">
                <h3>Title: {movieList.title}</h3>
                <p>Rating: {movieList.vote_average}</p>
              </div>

              <p>Release Date: {movieList.release_date}</p>
              <img src={movieList.poster_path} />
              <button className=" border-2 rounded-sm border-none bg-green-400 px-3 py-1 text-white">
                More Detail
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
