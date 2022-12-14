import React, { useState, useEffect } from "react";
import { getMovieList } from "../api/MovieService";
import "../styles/Home.scss";
import Films from "../images/films.svg";
import cinema from "../images/cinema.png";
import disney from "../images/disney.png";
import netflix from "../images/netflix.png";
import amazon from "../images/amazon.png";
import youtube from "../images/youtube.png";
import insta from "../images/instagram.png";
import facebook from "../images/facebook.png";
import twitter from "../images/twitter.png";
import google from "../images/google-plus.png";

function Home() {
  const [searchItems, setSearchItems] = useState("");
  const [movieList, setMovieList] = useState([]);

  const handleSearchList = (e) => {
      setSearchItems(e.target.value) 
  };

  useEffect(() => {
    async function getMovieListData() {
      const response = await getMovieList();
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
                    placeholder="Search based on Movies"
                    aria-label="Search"
                    value={searchItems}
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

      <div className="px-5 my-4">
        <div className="row">
          {movieList
            ?.filter((val) => {
              if (searchItems === "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(searchItems.toLowerCase())
              ) {
                return val;
              } else if (
                val.genres[0].toLowerCase().includes(searchItems.toLowerCase())
              ) {
                return val;
              }
              else if (
                val.length.toLowerCase().includes(searchItems.toLowerCase())
              ) {
                return val;
              }
              else if (
                val.cast[0].toLowerCase().includes(searchItems.toLowerCase())
              ) {
                return val;
              }
            })
            .map((moviesObj, key) => {
              return (
                <div className="col-md-4 col-sm-3">
                  <div className="card mt-5" key={key}>
                    <img
                      src={moviesObj.backdrop}
                      className="card-img-top"
                      alt="banner-img"
                    />
                    <div
                      className="card-body"
                      style={{
                        boxShadow:
                          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                      }}
                    >
                      <h5 className="card-title">{moviesObj.title}</h5>
                      <p className="card-text">{moviesObj.overview}</p>
                      <div className="card-casts">
                        <b>Cast:</b>&nbsp;<span>{moviesObj.cast[0]}</span>
                      </div>

                      <div className="card-casts">
                        <b>Director:</b>&nbsp;<span>{moviesObj.director}</span>
                      </div>

                      <div className="card-casts">
                        <b>Genres:</b>&nbsp;
                        <span>{moviesObj.genres.join(", ")}</span>
                      </div>

                      <div className="card-casts">
                        <b>Duration:</b>&nbsp;<span>{moviesObj.length}</span>
                      </div>
                    </div>
                  </div>
                 
                </div>
              );
            })}         
        </div>
      </div>

      <div className="movie-main-footer">
        <div className="row">
          <div className="col-md-4 sm-2">
            <div className="movie-first-footer my-5">
              <img src={cinema} width="100px" height="100px" alt="cinema" />
              <div className="movie-text-footer">
                Wookie-Movies & Theatres,
                <h5 className="movie-text-subhead">Thikkiiana City, </h5>
                <h6 className="movie-text-address">Wookiee homeworld of Kashyyyk.</h6>
              </div>
            </div>
          </div>

          <div className="col-md-4 sm-2 my-5">
            <div className="movie-text-streams">Streaming Partners</div>
            <div className="movie-streams-img">
            <img src={disney} width="80px" height="80px" alt="disney" />
            <img src={netflix} width="80px" height="80px" alt="netflix" />
            <img src={youtube} width="80px" height="80px" alt="youtube" />
            <img src={amazon} width="80px" height="80px" alt="amazon" />
            </div>
           
          </div>

          <div className="col-md-4 sm-2 my-5">
          <div className="movie-text-follow">Follow Us</div>
          <div className="movie-follow-img">
            <img src={insta} width="50px" height="50px" alt="insta" />
            <img src={facebook} width="50px" height="50px" alt="facebook" />
            <img src={twitter} width="50px" height="50px" alt="twitter" />
            <img src={google} width="50px" height="50px" alt="google" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
