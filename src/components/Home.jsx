import React, { useState, useEffect } from "react";
import { getMovieList } from "../api/MovieService";
import "../styles/Home.scss";
import Films from "../images/films.svg";

function Home() {
  const [searchItems, setSearchItems] = useState("");
  const [movieList, setMovieList] = useState([]);

  const handleSearchList = (e) => {
    setSearchItems(e.target.value);
  };

  useEffect(() => {
    async function getMovieListData() {
      const response = await getMovieList();
      console.log(response, "data");
      // console.log(response.data.movies, "...");
      if (response.data.movies && response.status === 200) {
        setMovieList(response.data.movies);
      } else {
        setMovieList([]);
      }
    }

    getMovieListData();
  }, []);

  return (
    <>
      <div className="movie-main-head">
        <div className="row">
          <div className="col-md-6 sm-4">
            <h5 className="movie-text-head">
              Wookie-movies... <br></br>
              <span className="movie-text-sub-head">
                Explore with us for more thriller!
                <form className="d-flex justify-content-between mt-3">
                  <input
                    className="form-control input-sm w-75"
                    id="myInput"
                    type="search"
                    placeholder="Search based on title"
                    aria-label="Search"
                    onChange={(e) => handleSearchList(e)}
                  />
                </form>
              </span>
            </h5>
          </div>

          <div className="col-md-6 sm-4">
            <img src={Films} width="100%" height="100%" alt="movies" />
          </div>
        </div>
      </div>

      <div className="container my-4">
        <div className="row">
          {movieList
            ?.filter((val) => {
              if (searchItems === "") {
                return val;
              } else if (val.title.toLowerCase().includes(searchItems.toLowerCase())) {
                return val;
              }
              else if(val.genres[0].toLowerCase().includes(searchItems.toLowerCase())) {
                return val;
              }
            })
            .map((moviesObj, key) => {
              return (
                <div className="col-md-4 col-sm-3">
                  <div className="card mt-5 box" key={key}>
                    <img
                      src={moviesObj.backdrop}
                      className="card-img-top"
                      alt="banner-img"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{moviesObj.title}</h5>
                      <p className="card-text">{moviesObj.overview}</p>
                      <div className="card-casts">
                        <b>Cast:</b>&nbsp;<span>{moviesObj.cast[0]}</span>
                        </div>

                        <div className="card-casts">
                        <b>Director:</b>&nbsp;<span>{moviesObj.director}</span>
                        </div>

                        <div className="card-casts">
                        <b>Genres:</b>&nbsp;<span>{moviesObj.genres.join(", ")}</span>
                        </div>
                      {/* <a class="btn btn-primary">Go somewhere</a> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
