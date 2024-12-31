import React, { useState, useEffect } from 'react'
import Card from './components/Card';
import './App.css'

const API_key="&api_key=e82851bccb823fad06989d22f76869b8";
const base_url= "https://api.themoviedb.org/3";
const url = base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
const arr = ["Popular", "Theatre","Kids","Drama","Comedy"];

function App() {
  const [movieData, setData]=useState([]);
  const [url_set, setUrl]=useState([url]);
  const [search, setSearch]=useState();

  useEffect(()=>{
    fetch(url_set).then(res=>res.json()).then(data=>{
      //console.log(data.results);
      setData(data.results);
    });
  },[url_set])

  const getData=(movieType)=>{
    if (movieType=="Popular")
    {
      url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
    }
    if (movieType=="Theatre")
      {
        url=base_url+"/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc"+API_key;
      }
    if (movieType=="Kids")
      {
          url=base_url+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key;
      }
    if (movieType=="Drama")
      {
          url=base_url+"/discover/movie?with_genres=18&primary_release_year=2024"+API_key;
      }
    if (movieType=="Comedy")
      {
            url=base_url+"/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc"+API_key;
      }
    setUrl(url);
  }
  
    const searchMovie=(evt)=>{
      if(evt.key=="Enter")
      {
        url=base_url+" "+search;
        setUrl(url);
        setSearch(" ");
      }
    }


  return (
    <>
      <div className = "header">
        <nav>
          <ul>

            <li><a href= "#"> Popular </a> </li>
            <li><a href= "#"> Theatre </a> </li>
            <li><a href= "#"> Kids </a> </li>
            <li><a href= "#"> Drama </a> </li>
            <li><a href= "#"> Comedy </a> </li>
          </ul>
        </nav>
        <form>
          <div className="search-btn">
            <input type="text" placeholder="Search for Movies" className="inputText" onChange={(e)=>{setSearch(e.target.value)}} 
            value={search} onKeyPress={searchMovie}>
            </input>
            <button type ="submit"> search </button>
          </div>
        </form>
      </div>  
      <div className="container">
       {
        (movieData.length==0)?<p className="notFound">Not Found</p>: movieData.map(()=>{
          return(
            <Card info={res} key={pos}/>
          )
        })
       }
      </div>      
      
    </>
  )
}

export default App;
