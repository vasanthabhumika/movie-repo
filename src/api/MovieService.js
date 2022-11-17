import axios from 'axios';

export const getMovieList = () => {
 const url = `https://wookie.codesubmit.io/movies`;
 const token = "Wookie2019";
 return axios.get(`${url}`, { headers: {"Authorization" : `Bearer ${token}`}});
}