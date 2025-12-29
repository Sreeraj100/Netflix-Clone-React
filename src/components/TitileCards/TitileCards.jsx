import React, { useEffect, useRef, useState } from 'react'
import './TitileCards.css'
import { Link } from 'react-router-dom';
import { API_OPTIONS } from '../../utils/api';
// import cards_data from '../../assets/cards/Cards_data'

const TitileCards = ({ titile, category }) => {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltaY;
  }


  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, API_OPTIONS)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    const cardList = cardsRef.current;
    if (cardList) {
      cardList.addEventListener('wheel', handleWheel, { passive: false })

      return () => {
        cardList.removeEventListener('wheel', handleWheel);
      };
    }
  }, [])


  return (
    <div className='titile-cards'>
      <h2>{titile ? titile : "Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/movie/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitileCards