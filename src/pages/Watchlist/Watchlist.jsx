import React from 'react';
import { useWatchlist } from '../../context/WatchlistContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'; // Reuse Navbar if possible
import { BACKDROP_BASE_URL, IMAGE_BASE_URL } from '../../utils/api';
import './Watchlist.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';

const Watchlist = () => {
    const { watchlist } = useWatchlist();
    const navigate = useNavigate();

    return (
        <div className="watchlist-page">
            <div className="watchlist-header">
                <img src={back_arrow_icon} alt="back" className="back-btn-wl" onClick={() => navigate(-1)} />
                <h1>My Watchlist</h1>
            </div>

            {watchlist.length === 0 ? (
                <div className="empty-watchlist">
                    <p>Your watchlist is empty.</p>
                    <Link to="/" className="btn">Browse Movies</Link>
                </div>
            ) : (
                <div className="watchlist-grid">
                    {watchlist.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className="watchlist-card">
                            <img
                                src={movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : 'placeholder.jpg'}
                                alt={movie.title}
                            />
                            <div className="watchlist-card-info">
                                <h3>{movie.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;
