import React, { useState } from 'react';
import axios from "axios";
import { FaLandmark, FaSpinner } from "react-icons/fa";
import { LiaBookSolid } from "react-icons/lia";
import { IoExitOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
const Home = () => {
  const [book, setBook] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSide, setShowSide] = useState(false);
  const [author,setAuthor] = useState("")
  const [imgAuthor,setImageAuthor] = useState([]);

  const handleShow = () => {
    setShowSide(!showSide);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const api = `https://openlibrary.org/search.json?q=${book}&author=${author}`;
    const apiImage = `https://covers.openlibrary.org/b/ISBN/${imgAuthor}-S.jpg`;
    try {
      const response = await axios.get(api);
      const bookData = response.data.docs.slice(0, 1);
      const bookISBN = bookData[0]?.isbn?.[0];
      if (bookISBN) {
        const apiImage = `https://covers.openlibrary.org/b/ISBN/${bookISBN}-M.jpg`;
        const responseImg = await axios.get(apiImage);
        setImageAuthor(responseImg.config.url);
        setSearchRes(bookData);
      } else {
        setSearchRes([]);
      }
      setIsLoading(false);
      console.log(response.data.docs);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    showSide ?
    <>
      <div className="home">
        <button onClick={handleShow} className='btn-exit'><IoExitOutline/></button>
        <form onSubmit={handleSearch}>
          <div>
            <h5><FaLandmark /> Library Management</h5>
            <p>Book that makes you think</p>
          </div>
          <input type="text" placeholder="Search for books" required value={book} onChange={e => setBook(e.target.value)} />
          <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
          <button type="submit" className='search'><BiSearchAlt/></button>
        </form>

        {isLoading ? (
          <div className="loader">
            <h1 className='wait'>Please Wait</h1>
            <FaSpinner className="loader__element" />
            <FaSpinner className="loader__element" />
            <FaSpinner className="loader__element" />
          </div>
        ) : (
          <div className='book'>
            <ul>
              {searchRes.map((book, index) => (
                <li key={index}>book - {book.title}
                <p>author - {book.author_name}</p>
                <p>publish - {book.first_publish_year}</p>
                <p>subject - {book.subject}</p>
                <p>language - {book.language}</p>
                <img src={imgAuthor} alt="Author Image" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
    :

    <div className='main'>
      <div className='library'>
        <div>
        <h1>Library Management System</h1>
        </div>

        <button className='btn-show' onClick={handleShow}>Explore <LiaBookSolid className='center' /></button>

        <RouterLink to="/sign">SignIn</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
    
      </div>
      <div class="wrapper">
  <div class="candles">
    <div class="light__wave"></div>
    <div class="candle1">
      <div class="candle1__body">
        <div class="candle1__eyes">
          <span class="candle1__eyes-one"></span>
          <span class="candle1__eyes-two"></span>
        </div>
        <div class="candle1__mouth"></div>
      </div>
      <div class="candle1__stick"></div>
    </div>
    
    <div class="candle2">
      <div class="candle2__body">
        <div class="candle2__eyes">
          <div class="candle2__eyes-one"></div>
          <div class="candle2__eyes-two"></div>
        </div>
      </div>
      <div class="candle2__stick"></div>
    </div>
    <div class="candle2__fire"></div>
    <div class="sparkles-one"></div>
    <div class="sparkles-two"></div>
    <div class="candle__smoke-one">

    </div>
    <div class="candle__smoke-two">

    </div>
    
  </div>
  <div class="floor">
  </div>
  

</div>


    </div>

  )
}

export default Home;