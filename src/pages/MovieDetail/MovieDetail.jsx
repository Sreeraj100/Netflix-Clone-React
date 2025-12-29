import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.css';
import { API_OPTIONS, BACKDROP_BASE_URL } from '../../utils/api';
import { useWatchlist } from '../../context/WatchlistContext';
import play_icon from '../../assets/play_icon.png';
import back_arrow_icon from '../../assets/back_arrow_icon.png';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, API_OPTIONS)
            .then(res => res.json())
            .then(data => setMovie(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!movie) return <div className="movie-detail-loading">Loading...</div>;

    const inWatchlist = isInWatchlist(movie.id);

    return (
        <div className="movie-detail">
            <img src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`} alt={movie.title} className="detail-backdrop" />
            <div className="detail-content">
                <img src={back_arrow_icon} alt="back" className="back-btn" onClick={() => navigate(-1)} />
                <h1>{movie.title}</h1>
                <p className="detail-overview">{movie.overview}</p>
                <div className="detail-meta">
                    <span>{movie.release_date?.split('-')[0]}</span>
                    <span>Rating: {movie.vote_average?.toFixed(1)}</span>
                </div>
                <div className="detail-actions">
                    <button className="btn" onClick={() => navigate(`/player/${id}`)}>
                        <img src={play_icon} alt="" /> Play
                    </button>
                    <button
                        className={`btn ${inWatchlist ? 'remove-btn' : 'dark-btn'}`}
                        onClick={() => inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                    >
                        {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
